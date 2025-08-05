// app/admin/(protected)/gallery/page.tsx
import React from "react";
import { getGalleryImages, deleteGalleryImage } from "./actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Pencil, Trash2, PlusCircle, Star } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import ImageWithFallback from "@/components/image-with-fallback"; // Import komponen baru

async function DeleteGalleryImageDialog({
  imageId,
  imageTitle,
}: {
  imageId: string;
  imageTitle: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Gambar</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus gambar &quot;{imageTitle}&quot;?
            Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <form action={deleteGalleryImage.bind(null, imageId)}>
            <Button type="submit" variant="destructive">
              Ya, Hapus
            </Button>
          </form>
          <DialogClose asChild>
            <Button variant="outline">Batal</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Galeri Gambar</h1>
        <Button asChild>
          <Link href="/admin/gallery/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Gambar Baru
          </Link>
        </Button>
      </div>

      {images.length === 0 ? (
        <p className="text-gray-600">
          Belum ada gambar di galeri. Ayo tambahkan yang pertama!
        </p>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Gambar</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Upload</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {images.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>
                    <ImageWithFallback
                      src={image.image_url}
                      alt={image.title}
                      className="w-16 h-16 object-cover rounded-md"
                      fallbackSrc="/placeholder-image.png"
                      // --- Tambahkan properti width dan height ini ---
                      width={64} // set width to 64px (tailwind w-16)
                      height={64} // set height to 64px (tailwind h-16)
                      // ------------------------------------------------
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                      {image.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {image.category || "umum"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {image.featured && (
                      <Badge
                        variant="default"
                        className="flex items-center gap-1 w-fit"
                      >
                        <Star className="h-3 w-3" />
                        Unggulan
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {format(new Date(image.created_at), "dd MMM yyyy", {
                      locale: id,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/gallery/${image.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteGalleryImageDialog
                        imageId={image.id}
                        imageTitle={image.title}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
