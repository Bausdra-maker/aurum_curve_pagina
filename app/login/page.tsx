import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { getSession } from "@/lib/session";

export const metadata = { title: "Ingresar · Aurum Curve" };

export default async function LoginPage() {
  if (await getSession()) redirect("/catalogo");
  return <AuthForm mode="sign-in" />;
}
