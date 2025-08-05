// app/admin/(protected)/gallery/[id]/edit/page.tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getGalleryImageById, updateGalleryImage } from "../../actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { notFound } from "next/navigation";

export default async function EditGalleryImagePage({
  params,
}: {
  params: { id: string };
}) {
  const image = await getGalleryImageById(params.id);

  if (!image) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Gambar</CardTitle>
          <CardDescription>
            Perbarui informasi gambar galeri. Unggah gambar baru untuk mengganti
            yang lama.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={updateGalleryImage.bind(null, image.id)}
            className="space-y-6"
          >
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="title">Judul Gambar</Label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Masukkan judul gambar"
                defaultValue={image.title}
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="image">Unggah Gambar Baru (Opsional)</Label>
              <Input type="file" id="image" name="image" accept="image/*" />
              <p className="text-sm text-gray-500">
                Biarkan kosong jika tidak ingin mengganti gambar.
              </p>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Masukkan deskripsi singkat gambar"
                defaultValue={image.description || ""}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="category">Kategori</Label>
              <Select name="category" defaultValue={image.category || "umum"}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="umum">Umum</SelectItem>
                  <SelectItem value="armada">Armada</SelectItem>
                  <SelectItem value="pelanggan">Pelanggan</SelectItem>
                  <SelectItem value="wisata">Wisata</SelectItem>
                  <SelectItem value="kantor">Kantor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="tags">Tags (dipisahkan koma)</Label>
              <Input
                type="text"
                id="tags"
                name="tags"
                placeholder="rental, mobil, avanza, medan"
                defaultValue={image.tags?.join(", ") || ""}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                name="featured"
                defaultChecked={image.featured}
              />
              <Label
                htmlFor="featured"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Unggulkan di galeri publik
              </Label>
            </div>
            <div className="flex gap-4">
              <Button type="submit">Simpan Perubahan</Button>
              <Button asChild variant="outline">
                <Link href="/admin/gallery">Batal</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
