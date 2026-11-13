"use server";

import { revalidatePath } from "next/cache";
import { API_URL } from "@/lib/api";
import { getSession } from "@/lib/session";

type CheckoutLine = {
  productId: number;
  variantId: number;
  size: string;
  color: string | null;
  quantity: number;
};

type CheckoutInput = {
  lines: CheckoutLine[];
  fulfillment: string;
  paymentMethod: string;
  address?: string;
  notes?: string;
};

type Result = { ok: true; orderId: number } | { ok: false; error: string };

const MAX_UNITS_PER_ORDER = 2000;

export async function createOrder(input: CheckoutInput): Promise<Result> {
  const session = await getSession();
  if (!session?.userId) {
    return { ok: false, error: "Iniciá sesión para hacer un pedido." };
  }

  const { lines, fulfillment, paymentMethod } = input;
  if (!Array.isArray(lines) || lines.length === 0 || lines.length > 50) {
    return { ok: false, error: "Tu carrito está vacío." };
  }
  if (!["pickup", "delivery"].includes(fulfillment)) {
    return { ok: false, error: "Elegí retiro o envío." };
  }
  if (!["transfer", "cash", "card"].includes(paymentMethod)) {
    return { ok: false, error: "Elegí un medio de pago." };
  }

  const address = input.address?.trim().slice(0, 300) || null;
  const notes = input.notes?.trim().slice(0, 500) || null;

  if (fulfillment === "delivery" && !address) {
    return { ok: false, error: "Necesitamos una dirección de envío." };
  }

  let totalUnits = 0;
  for (const line of lines) {
    if (
      !Number.isInteger(line.productId) ||
      !Number.isInteger(line.variantId) ||
      !Number.isInteger(line.quantity) ||
      line.quantity <= 0
    ) {
      return { ok: false, error: "El contenido del carrito no es válido." };
    }
    totalUnits += line.quantity;
  }

  if (totalUnits > MAX_UNITS_PER_ORDER) {
    return {
      ok: false,
      error: `Los pedidos tienen un límite de ${MAX_UNITS_PER_ORDER} unidades.`,
    };
  }

  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.userId,
        lines,
        fulfillment,
        paymentMethod,
        address,
        notes,
      }),
    });

    if (!response.ok) {
      throw new Error("Error en el servidor al registrar el pedido.");
    }

    const data = await response.json();

    revalidatePath("/mis-pedidos");
    revalidatePath("/panel");

    return { ok: true, orderId: data.orderId || 1001 };
  } catch (error) {
    console.error("createOrder failed", error);
    return { ok: false, error: "No se pudo conectar con el servidor backend." };
  }
}
