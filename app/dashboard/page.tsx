import { redirect } from "next/navigation";

// Ruta antigua: ahora vive en /panel.
export default function DashboardPage() {
  redirect("/panel");
}
