// lib/settings.ts
// Ini adalah file konfigurasi utama untuk menyimpan data statis website seperti kontak dan media sosial.
// Data ini akan di-load ke seluruh komponen yang memerlukannya.

export interface WebsiteSettings {
  site_name: string;
  site_description: string;
  contact_phone: string;
  contact_email: string;
  contact_address: string;
  whatsapp_number: string;
  facebook_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  updated_at: string;
}

const SETTINGS_KEY = "website_settings";

// Data pengaturan default untuk website
const defaultSettings: WebsiteSettings = {
  site_name: "CV ATS RentCar",
  site_description:
    "Layanan rental mobil terpercaya dengan armada lengkap dan harga terjangkau",
  contact_phone: "+62 821-1547-1992",
  contact_email: "cvanaktunggalsejahtera@gmail.com",
  contact_address:
    "JQVC+6QM, Bandar Klippa, Kec. Percut Sei Tuan, Kabupaten Deli Serdang, Sumatera Utara",
  whatsapp_number: "6282115471992",
  facebook_url: "https://facebook.com/atsrentcar",
  instagram_url:
    "https://www.instagram.com/atsrentalmedan_?igsh=c2FvNmkxaW1uejF1",
  tiktok_url: "https://www.tiktok.com/@ats_rentcarmedan?_t=ZS-8ycDbndiE8m&_r=1",
  updated_at: new Date().toISOString(),
};

// Fungsi untuk mendapatkan data pengaturan dari local storage
export function getSettings(): WebsiteSettings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Jika tidak ada di local storage, simpan dan kembalikan data default
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
    return defaultSettings;
  } catch (error) {
    // Jika ada error saat parsing, kembalikan data default
    console.error("Failed to load settings from local storage:", error);
    return defaultSettings;
  }
}

// Fungsi untuk memperbarui data pengaturan
export function updateSettings(
  updates: Partial<WebsiteSettings>
): WebsiteSettings {
  const current = getSettings();
  const updated = {
    ...current,
    ...updates,
    updated_at: new Date().toISOString(),
  };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  return updated;
}
