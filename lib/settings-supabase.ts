"use server";

import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase-server";

// Fungsi untuk mengambil semua pengaturan dari tabel key-value
export async function getSettings() {
  const { data: rows, error } = await supabaseServer
    .from("settings")
    .select("key, value");

  if (error) {
    console.error("Error fetching settings:", error);
    return null;
  }

  const settings = rows.reduce((acc, row) => {
    try {
      // Mencoba parse value jika berupa JSON
      acc[row.key] = JSON.parse(row.value);
    } catch {
      // Jika bukan JSON, simpan sebagai string biasa
      acc[row.key] = row.value;
    }
    return acc;
  }, {});

  return settings;
}

// Fungsi untuk memperbarui pengaturan berdasarkan key
export async function updateSettings(
  _prevState: any, // Tambahkan parameter ini untuk useActionState
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  // Map form data fields to database keys
  const formMap = {
    hero_title: "featured_text",
    about_description: "site_description",
    footer_text: "company_info", // Complex field, needs special handling
    whatsapp: "company_info",
    instagram: "company_info",
    email: "contact_email",
    phone: "contact_phone",
    address: "contact_address",
    gmaps_link: "gmaps_link",
  };

  try {
    const existingSettings = await getSettings();
    if (!existingSettings) {
      return {
        success: false,
        message: "Gagal mengambil pengaturan yang sudah ada.",
      };
    }

    // Process updates for simple key-value pairs
    for (const [formKey, dbKey] of Object.entries(formMap)) {
      const formValue = formData.get(formKey) as string;
      if (
        formKey !== "footer_text" &&
        formKey !== "whatsapp" &&
        formKey !== "instagram" &&
        formKey !== "email" &&
        formKey !== "phone" &&
        formKey !== "address"
      ) {
        await supabaseServer
          .from("settings")
          .update({ value: formValue })
          .eq("key", dbKey);
      }
    }

    const companyInfoValue = existingSettings.company_info;
    const updatedCompanyInfo = {
      ...companyInfoValue,
      phone: formData.get("phone") as string,
      whatsapp: formData.get("whatsapp") as string,
      address: formData.get("address") as string,
      email: formData.get("email") as string,
      socials: {
        ...companyInfoValue.socials,
        instagram: formData.get("instagram") as string,
      },
    };

    await supabaseServer
      .from("settings")
      .update({ value: JSON.stringify(updatedCompanyInfo) })
      .eq("key", "company_info");

    const gmapsLink = formData.get("gmaps_link") as string;
    await supabaseServer
      .from("settings")
      .update({ value: gmapsLink })
      .eq("key", "gmaps_link");

    const heroDescription = formData.get("hero_description") as string;
    await supabaseServer
      .from("settings")
      .update({ value: heroDescription })
      .eq("key", "site_description");

    const aboutDescription = formData.get("about_description") as string;
    await supabaseServer
      .from("settings")
      .update({ value: aboutDescription })
      .eq("key", "about_description");

    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { success: true, message: "Pengaturan berhasil diperbarui." };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, message: "Gagal memperbarui pengaturan." };
  }
}
