import { redirect } from "next/navigation";
import { API_URL } from "@/lib/api";
import { getSession, isStaff } from "@/lib/session";
import { formatPrice, statusLabel } from "@/lib/store";

export const metadata = { title: "Panel interno · Aurum Curve" };

const ROLE_LABELS: Record<string, string> = {
  seller: "Vendedor",
  warehouse: "Depósito",
  delivery: "Delivery",
  admin: "Administración",
  community_manager: "Community Manager",
};

async function getAllOrders() {
  try {
    const res = await fetch(`${API_URL}/api/orders`, { cache: "no-store" });
    if (res.ok) return (await res.json()) as any[];
  } catch {
    // Backend inactivo o endpoint aún no implementado: tabla vacía.
  }
  return [];
}

export default async function PanelPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!isStaff(session.role)) redirect("/");

  const orders = await getAllOrders();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-4xl font-medium md:text-5xl">Panel interno</h1>
        <span className="rounded-full bg-accent/50 px-3 py-1 text-xs font-semibold text-primary">
          {ROLE_LABELS[session.role] ?? session.role}
        </span>
      </div>

      <h2 className="mt-8 mb-4 font-serif text-2xl font-medium">Pedidos recientes</h2>
      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
          No hay pedidos registrados todavía.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-card">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b bg-muted/50 text-sm text-muted-foreground">
                <th className="p-4"># ID</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Total</th>
                <th className="p-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b last:border-0 hover:bg-muted/20">
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4 text-muted-foreground">{order.userId || "Mayorista"}</td>
                  <td className="p-4 font-semibold">{formatPrice(Number(order.total) || 0)}</td>
                  <td className="p-4">
                    <span className="rounded bg-primary/10 px-2 py-1 text-xs text-primary">
                      {statusLabel(order.status || "reserved")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
