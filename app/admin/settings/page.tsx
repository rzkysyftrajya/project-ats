// app/admin/settings/page.tsx
import { getSettings } from "@/lib/settings-supabase";
import { notFound } from "next/navigation";
import { SettingForm } from "./setting-form";

export default async function SettingsPage() {
  const settings = await getSettings();

  if (!settings) {
    return notFound();
  }

  // Mengirim data ke form dengan format yang sesuai
  const formattedSettings = {
    hero_title: settings.featured_text,
    hero_description: settings.site_description,
    about_description: settings.about_description, // Assume this exists in DB
    whatsapp: settings.company_info?.whatsapp,
    instagram: settings.company_info?.socials?.instagram,
    email: settings.contact_email,
    phone: settings.contact_phone,
    address: settings.contact_address,
    gmaps_link: settings.gmaps_link, // Assume this exists in DB
    footer_text: settings.footer_text, // Assume this exists in DB
  };

  return <SettingForm settings={formattedSettings} />;
}
