"use client";

import { updateSettings } from "@/lib/settings-supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { type FormEvent } from "react";

type SettingsType = {
  hero_title: string;
  hero_description: string;
  about_description: string;
  whatsapp: string;
  instagram: string;
  email: string;
  phone: string;
  address: string;
  gmaps_link: string;
  footer_text: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Menyimpan..." : "Simpan Perubahan"}
    </Button>
  );
}

export function SettingForm({ settings }: { settings: SettingsType }) {
  const [state, formAction] = useActionState(updateSettings, null);

  if (state && state.message) {
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Pengaturan Website</h1>
        <p className="text-muted-foreground">
          Kelola informasi umum dan kontak website Anda.
        </p>
      </div>

      <form action={formAction} className="space-y-8">
        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profil Perusahaan</CardTitle>
            <CardDescription>
              Informasi umum tentang perusahaan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero_title">Judul Utama (Home)</Label>
              <Input
                id="hero_title"
                name="hero_title"
                type="text"
                defaultValue={settings.hero_title || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_description">Deskripsi Utama (Home)</Label>
              <Textarea
                id="hero_description"
                name="hero_description"
                defaultValue={settings.hero_description || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about_description">Deskripsi Tentang Kami</Label>
              <Textarea
                id="about_description"
                name="about_description"
                defaultValue={settings.about_description || ""}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact & Social Section */}
        <Card>
          <CardHeader>
            <CardTitle>Kontak & Media Sosial</CardTitle>
            <CardDescription>
              Perbarui informasi kontak dan tautan media sosial.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                type="text"
                defaultValue={settings.whatsapp || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Tautan Instagram</Label>
              <Input
                id="instagram"
                name="instagram"
                type="text"
                defaultValue={settings.instagram || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Resmi</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={settings.email || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={settings.phone || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Alamat Kantor</Label>
              <Input
                id="address"
                name="address"
                type="text"
                defaultValue={settings.address || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gmaps_link">Tautan Google Maps</Label>
              <Input
                id="gmaps_link"
                name="gmaps_link"
                type="text"
                defaultValue={settings.gmaps_link || ""}
              />
            </div>
          </CardContent>
        </Card>

        {/* Footer Section */}
        <Card>
          <CardHeader>
            <CardTitle>Footer</CardTitle>
            <CardDescription>
              Teks yang akan ditampilkan di bagian bawah (footer).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="footer_text">Teks Footer</Label>
              <Input
                id="footer_text"
                name="footer_text"
                type="text"
                defaultValue={settings.footer_text || ""}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Batal
          </Button>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
