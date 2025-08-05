"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ImageIcon,
  Undo,
  Redo,
  Type,
  Eye,
  EyeOff,
} from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder = "Mulai menulis artikel..." }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [fontSize, setFontSize] = useState("16")

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    updateContent()
    editorRef.current?.focus()
  }

  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleImageButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Pilih file gambar (JPG, PNG, WebP)")
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const imageData = e.target?.result as string
      const img = `<img src="${imageData}" alt="Gambar artikel" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />`

      // Insert image at cursor position
      if (editorRef.current) {
        editorRef.current.focus()
        executeCommand("insertHTML", img)
      }
    }
    reader.readAsDataURL(file)

    // Reset input value
    event.target.value = ""
  }

  const formatBlock = (tag: string) => {
    executeCommand("formatBlock", tag)
  }

  const toolbarButtons = [
    {
      group: "format",
      items: [
        { icon: Bold, command: "bold", title: "Bold (Ctrl+B)" },
        { icon: Italic, command: "italic", title: "Italic (Ctrl+I)" },
        { icon: Underline, command: "underline", title: "Underline (Ctrl+U)" },
      ],
    },
    {
      group: "list",
      items: [
        { icon: List, command: "insertUnorderedList", title: "Bullet List" },
        { icon: ListOrdered, command: "insertOrderedList", title: "Numbered List" },
      ],
    },
    {
      group: "align",
      items: [
        { icon: AlignLeft, command: "justifyLeft", title: "Align Left" },
        { icon: AlignCenter, command: "justifyCenter", title: "Align Center" },
        { icon: AlignRight, command: "justifyRight", title: "Align Right" },
      ],
    },
  ]

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />

      {/* Toolbar */}
      <div className="border-b border-gray-200 p-3 bg-gray-50">
        <div className="flex flex-wrap items-center gap-2">
          {/* Format Dropdown */}
          <Select onValueChange={formatBlock}>
            <SelectTrigger className="w-32 h-8 text-sm">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="div">Normal</SelectItem>
              <SelectItem value="h1">Judul Besar</SelectItem>
              <SelectItem value="h2">Sub Judul</SelectItem>
              <SelectItem value="h3">Judul Kecil</SelectItem>
              <SelectItem value="p">Paragraf</SelectItem>
            </SelectContent>
          </Select>

          {/* Font Size */}
          <Select
            value={fontSize}
            onValueChange={(size) => {
              setFontSize(size)
              if (editorRef.current) {
                editorRef.current.style.fontSize = size + "px"
              }
            }}
          >
            <SelectTrigger className="w-16 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="14">14</SelectItem>
              <SelectItem value="16">16</SelectItem>
              <SelectItem value="18">18</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="24">24</SelectItem>
            </SelectContent>
          </Select>

          {/* Separator */}
          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Toolbar Buttons */}
          {toolbarButtons.map((group, groupIndex) => (
            <div key={groupIndex} className="flex items-center gap-1">
              {group.items.map((item, itemIndex) => (
                <Button
                  key={itemIndex}
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-200"
                  onClick={() => executeCommand(item.command)}
                  title={item.title}
                >
                  <item.icon className="w-4 h-4" />
                </Button>
              ))}
              {groupIndex < toolbarButtons.length - 1 && <div className="w-px h-6 bg-gray-300 mx-1" />}
            </div>
          ))}

          {/* Image Button */}
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-200"
            onClick={handleImageButtonClick}
            title="Insert Image"
          >
            <ImageIcon className="w-4 h-4" />
          </Button>

          {/* History */}
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-200"
            onClick={() => executeCommand("undo")}
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-200"
            onClick={() => executeCommand("redo")}
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </Button>

          {/* Preview Toggle */}
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-sm"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
            {showPreview ? "Edit" : "Preview"}
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="min-h-[400px]">
        {showPreview ? (
          <div className="p-6 prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: value }} />
          </div>
        ) : (
          <div
            ref={editorRef}
            contentEditable
            className="p-6 min-h-[400px] outline-none focus:ring-0 text-gray-900 leading-relaxed"
            style={{ fontSize: fontSize + "px" }}
            onInput={updateContent}
            onPaste={(e) => {
              e.preventDefault()
              const text = e.clipboardData.getData("text/plain")
              executeCommand("insertText", text)
            }}
            suppressContentEditableWarning={true}
            data-placeholder={placeholder}
          />
        )}
      </div>

      {/* Status Bar */}
      <div className="border-t border-gray-200 px-4 py-2 bg-gray-50 text-sm text-gray-600 flex justify-between items-center">
        <div>
          Kata:{" "}
          {
            value
              .replace(/<[^>]*>/g, "")
              .split(" ")
              .filter((word) => word.length > 0).length
          }
        </div>
        <div className="flex items-center space-x-4">
          <span>Zoom: 100%</span>
          <span className="flex items-center">
            <Type className="w-4 h-4 mr-1" />
            {fontSize}px
          </span>
        </div>
      </div>

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          font-style: italic;
        }
        
        [contenteditable] h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
          color: #1f2937;
        }
        
        [contenteditable] h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.8rem 0;
          color: #374151;
        }
        
        [contenteditable] h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.6rem 0;
          color: #4b5563;
        }
        
        [contenteditable] p {
          margin: 0.5rem 0;
          line-height: 1.6;
        }
        
        [contenteditable] ul, [contenteditable] ol {
          margin: 0.5rem 0;
          padding-left: 2rem;
        }
        
        [contenteditable] li {
          margin: 0.25rem 0;
        }
        
        [contenteditable] strong {
          font-weight: bold;
        }
        
        [contenteditable] em {
          font-style: italic;
        }
        
        [contenteditable] u {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
