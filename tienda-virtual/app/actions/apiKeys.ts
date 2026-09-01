"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/requireSession";
import { crearApiKey, revocarApiKey } from "@/lib/auth/apiKeys";
import { parseNumber, parseText } from "@/app/actions/helpers";

export async function crearApiKeyAction(formData: FormData): Promise<void> {
  await requireSession();
  const nombre = parseText(formData.get("nombre"), "nombre");
  const { plaintext } = await crearApiKey(nombre);
  revalidatePath("/admin/api-keys");
  redirect(`/admin/api-keys?nueva=${encodeURIComponent(plaintext)}`);
}

export async function revocarApiKeyAction(formData: FormData): Promise<void> {
  await requireSession();
  const id = parseNumber(formData.get("id"), "id");
  await revocarApiKey(id);
  revalidatePath("/admin/api-keys");
  redirect("/admin/api-keys");
}
