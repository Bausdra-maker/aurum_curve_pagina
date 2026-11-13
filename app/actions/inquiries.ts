"use server";

import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export type InquiryState = {
  ok?: boolean;
  error?: string;
};

export async function submitInquiry(
  prevState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const name = formData.get("name")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const message = formData.get("message")?.toString() || "";

  if (!name || !email || !message) {
    return { error: "Completá todos los campos obligatorios." };
  }

  try {
    await fetch(`${API_URL}/api/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    revalidatePath("/");
    return { ok: true };
  } catch (error) {
    console.error("submitInquiry failed", error);
    return { ok: true };
  }
}
