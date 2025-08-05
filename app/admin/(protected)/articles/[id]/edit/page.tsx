// app/admin/(protected)/articles/[id]/edit/page.tsx
// Halaman ini adalah Server Component, jadi tidak ada "use client"

import { getArticleById } from "../../actions";
import { notFound } from "next/navigation";
import EditArticleForm from "./EditArticleForm";

interface EditArticlePageProps {
  params: { id: string };
}

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  // Ambil data di Server Component
  const article = await getArticleById(params.id); // <-- Perbaikan di sini

  if (!article) {
    notFound();
  }

  // Render Client Component dan kirim data sebagai props
  return <EditArticleForm article={article} />;
}
