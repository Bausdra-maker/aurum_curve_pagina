"use server";

import { cookies } from "next/headers";
import { API_URL } from "@/lib/api";
import { SESSION_COOKIE, USER_COOKIE, encodeUser, type SessionUser } from "@/lib/session";

type AuthResult = { ok: true } | { ok: false; error: string };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function startSession(user: SessionUser) {
  const store = await cookies();
  const options = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
  store.set(SESSION_COOKIE, user.id, options);
  store.set(USER_COOKIE, encodeUser(user), options);
}

function userFromApi(data: any, fallback: Partial<SessionUser>): SessionUser | null {
  if (!data?.userId) return null;
  return {
    id: String(data.userId),
    name: data.name ?? fallback.name ?? "Cliente",
    email: data.email ?? fallback.email ?? "",
    businessName: data.businessName ?? fallback.businessName ?? null,
    role: data.role ?? "buyer",
  };
}

export async function signIn(input: { email: string; password: string }): Promise<AuthResult> {
  const email = input.email.trim();
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Ingresá un email válido." };

  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: input.password }),
    });
    if (!res.ok) return { ok: false, error: "Email o contraseña incorrectos." };

    const user = userFromApi(await res.json(), { email });
    if (!user) return { ok: false, error: "Respuesta inválida del servidor." };
    await startSession(user);
    return { ok: true };
  } catch (error) {
    console.error("signIn failed:", error);
    return { ok: false, error: "No se pudo conectar con el servidor backend." };
  }
}

export async function signOut() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  store.delete(USER_COOKIE);
}
