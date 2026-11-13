import { redirect } from "next/navigation";

// Ruta antigua: ahora vive en /mis-pedidos.
export default function AccountPage() {
  redirect("/mis-pedidos");
}
