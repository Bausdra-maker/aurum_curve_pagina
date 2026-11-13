import { cookies } from "next/headers";

export const SESSION_COOKIE = "aurum_session";
export const USER_COOKIE = "aurum_user";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  businessName: string | null;
  role: string;
};

export function encodeUser(user: SessionUser) {
  return Buffer.from(JSON.stringify(user)).toString("base64url");
}

function decodeUser(raw: string | undefined): SessionUser | null {
  if (!raw) return null;
  try {
    return JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as SessionUser;
  } catch {
    return null;
  }
}

// TEMPORAL (Sprint 1): cookies sin firmar. Se reemplaza por JWT/sesión firmada del backend.
export async function getSession() {
  const store = await cookies();
  const id = store.get(SESSION_COOKIE)?.value;
  const user = decodeUser(store.get(USER_COOKIE)?.value);
  if (!id || !user || user.id !== id) return null;
  return { userId: id, role: user.role, user };
}

export function isStaff(role?: string) {
  return !!role && role !== "buyer";
}
