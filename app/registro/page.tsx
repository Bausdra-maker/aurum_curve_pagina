import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { getSession } from "@/lib/session";

export const metadata = { title: "Crear cuenta · Aurum Curve" };

export default async function RegistroPage() {
  if (await getSession()) redirect("/catalogo");
  return <AuthForm mode="sign-up" />;
}
