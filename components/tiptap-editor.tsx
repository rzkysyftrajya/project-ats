// components/tiptap-editor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react"; // <-- Import useState dan useEffect

const TiptapToolbar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input bg-transparent rounded-md p-1 flex items-center gap-1 mb-2 flex-wrap">
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 h-auto ${editor.isActive("bold") ? "is-active" : ""}`}
        variant="ghost"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 h-auto ${editor.isActive("italic") ? "is-active" : ""}`}
        variant="ghost"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 h-auto ${
          editor.isActive("bulletList") ? "is-active" : ""
        }`}
        variant="ghost"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 h-auto ${
          editor.isActive("orderedList") ? "is-active" : ""
        }`}
        variant="ghost"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default function TiptapEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) {
  const [isClient, setIsClient] = useState(false); // <-- Tambahkan state ini

  useEffect(() => {
    setIsClient(true); // <-- Set ke true setelah komponen terpasang di client
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert min-h-[300px] max-h-[500px] overflow-y-auto w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    immediatelyRender: false, // <-- Tambahkan baris ini
  });

  return (
    <div className="flex flex-col">
      {isClient && editor ? ( // <-- Render hanya di sisi client
        <>
          <TiptapToolbar editor={editor} />
          <EditorContent editor={editor} />
        </>
      ) : (
        <div className="min-h-[300px] w-full rounded-md border border-input bg-gray-50 flex items-center justify-center text-gray-500">
          Memuat editor...
        </div>
      )}
    </div>
  );
}
