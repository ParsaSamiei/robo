"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
}

// Docs/06_ADMIN_PANEL.md #10 nav includes a Settings section; SiteSetting is
// a plain key/value store (05 §51), so this is intentionally a simple
// upsert-by-key form rather than a typed settings schema.
export async function upsertSetting(formData: FormData) {
  await requireAdmin();
  const key = String(formData.get("key") ?? "").trim();
  const value = String(formData.get("value") ?? "").trim();
  if (!key) return;

  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
  revalidatePath("/admin/settings");
}

export async function deleteSetting(key: string) {
  await requireAdmin();
  await prisma.siteSetting.delete({ where: { key } });
  revalidatePath("/admin/settings");
}
