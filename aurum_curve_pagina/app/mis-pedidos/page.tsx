import Link from "next/link";
import { redirect } from "next/navigation";
import { API_URL } from "@/lib/api";
import { getSession } from "@/lib/session";
import { formatPrice, statusLabel } from "@/lib/store";

export const metadata = { title: "Mis pedidos · Aurum Curve" };

async function getUserOrders(userId: string) {
  try {
    const res = await fetch(`${API_URL}/api/orders/user/${encodeURIComponent(userId)}`, {
      cache: "no-store",
    });
    if (res.ok) return (await res.json()) as any[];
  } catch {
    // Backend inactivo o endpoint aún no implementado (Sprint 2): lista vacía.
  }
  return [];
}

export default async function MisPedidosPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const orders = await getUserOrders(session.userId);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-serif text-4xl font-medium md:text-5xl">Mis pedidos</h1>
      <p className="mt-2 text-muted-foreground">
        {session.user.name}
        {session.user.businessName ? ` · ${session.user.businessName}` : ""}
      </p>

      {orders.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed p-10 text-center">
          <p className="text-muted-foreground">Todavía no tenés pedidos registrados.</p>
          <Link href="/catalogo" className="mt-3 inline-block font-medium text-primary hover:underline">
            Ir al catálogo
          </Link>
        </div>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {orders.map((order) => (
            <li key={order.id} className="flex items-center justify-between rounded-2xl border bg-card p-5">
              <div>
                <p className="font-medium">Pedido #{order.id}</p>
                <p className="text-sm text-muted-foreground">Total: {formatPrice(Number(order.total) || 0)}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {statusLabel(order.status || "reserved")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
