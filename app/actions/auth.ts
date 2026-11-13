"use server";

import { cookies } from "next/headers";
import { API_URL } from "@/lib/api";
import { SEED_USERS } from "@/lib/mock/data";
import {
  SESSION_COOKIE,
  USER_COOKIE,
  encodeUser,
  type SessionUser,
} from "@/lib/session";

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

// Contrato esperado del backend (Sprint 1): { userId, name, email, businessName, role }
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

export async function signIn(input: {
  email: string;
  password: string;
}): Promise<AuthResult> {
  const email = input.email.trim();
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Ingresá un email válido." };
  }

  // Cuentas demo SOLO en desarrollo, hasta que exista /api/auth/login en el backend.
  if (process.env.NODE_ENV !== "production") {
    const demo = SEED_USERS.find(
      (u) => u.email === email.toLowerCase() && u.password === input.password,
    );
    if (demo) {
      await startSession({
        id: demo.id,
        name: demo.name,
        email: demo.email,
        businessName: demo.businessName,
        role: demo.role,
      });
      return { ok: true };
    }
  }

  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: input.password }),
    });

    if (res.status === 404) {
      return {
        ok: false,
        error: "El login real llega en el Sprint 1. Usá una cuenta demo.",
      };
    }
    if (!res.ok) {
      return { ok: false, error: "Email o contraseña incorrectos." };
    }

    const user = userFromApi(await res.json(), { email });
    if (!user) return { ok: false, error: "Respuesta inválida del servidor." };
    await startSession(user);
    return { ok: true };
  } catch (error) {
    console.error("signIn failed:", error);
    return { ok: false, error: "No se pudo conectar con el servidor." };
  }
}

export async function signUp(input: {
  name: string;
  email: string;
  password: string;
  businessName?: string;
  phone?: string;
}): Promise<AuthResult> {
  const name = input.name.trim().slice(0, 120);
  const email = input.email.trim().slice(0, 200);

  if (!name || !EMAIL_RE.test(email) || input.password.length < 8) {
    return {
      ok: false,
      error: "No pudimos crear tu cuenta. Revisá los datos e intentá de nuevo.",
    };
  }

  try {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password: input.password,
        businessName: input.businessName?.trim().slice(0, 160) || null,
        phone: input.phone?.trim().slice(0, 40) || null,
      }),
    });

    if (res.status === 404) {
      return {
        ok: false,
        error: "El registro real llega en el Sprint 1. Por ahora usá una cuenta demo.",
      };
    }
    if (!res.ok) {
      return {
        ok: false,
        error: "Ya existe una cuenta con ese email o hubo un error.",
      };
    }

    const user = userFromApi(await res.json(), {
      name,
      email,
      businessName: input.businessName?.trim() || null,
    });
    if (!user) return { ok: false, error: "Respuesta inválida del servidor." };
    await startSession(user);
    return { ok: true };
  } catch (error) {
    console.error("signUp failed:", error);
    return { ok: false, error: "No se pudo conectar con el servidor." };
  }
}

export async function signOut() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  store.delete(USER_COOKIE);
}
