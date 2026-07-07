"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface ImagePickerProps {
  value: string;
  onChange: (url: string) => void;
  size?: number;
  recommendedSize?: string;
}

export function ImagePicker({
  value,
  onChange,
  size = 48,
  recommendedSize = "Recommended size: 800 × 600px (4:3), JPG/PNG/WEBP, under 1MB",
}: ImagePickerProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImageUpload(file: File) {
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();

    setUploading(false);

    if (!res.ok) {
      setError(data.error || "Image upload failed.");
      return;
    }

    onChange(data.url);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  }

  return (
    <div>
      <p className="mb-2 text-xs text-chocolate/60">{recommendedSize}</p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml"
        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
        className="hidden"
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        style={{ height: size * 4, width: size * 4 }}
        className={`relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed bg-blush-light/50 transition-colors ${
          dragActive ? "border-blush-dark bg-blush-light" : "border-blush-light"
        }`}
      >
        {value ? (
          <>
            <Image src={value} alt="Preview" fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity hover:bg-black/40 hover:opacity-100">
              <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-chocolate">
                Tap to change
              </span>
            </div>
          </>
        ) : uploading ? (
          <span className="text-sm text-chocolate/60">Uploading...</span>
        ) : (
          <div className="px-4 text-center text-sm text-chocolate/60">
            <span className="block text-2xl">📷</span>
            Tap to choose a photo
            <br />
            or drag it here
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-sm font-medium text-blush-dark hover:underline"
        >
          {value ? "Change Photo" : "Choose Photo"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-sm font-medium text-red-600 hover:underline"
          >
            Remove Photo
          </button>
        )}
        <button
          type="button"
          onClick={() => setShowUrlInput((v) => !v)}
          className="text-sm font-medium text-chocolate/60 hover:underline"
        >
          {showUrlInput ? "Hide URL option" : "Paste image URL instead"}
        </button>
      </div>

      {uploading && <p className="mt-1 text-xs text-chocolate/60">Uploading...</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

      {showUrlInput && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/photo.jpg"
          className="mt-2 w-full rounded-xl border border-blush-light bg-white px-3 py-2 text-sm text-chocolate focus:border-blush-dark focus:outline-none"
        />
      )}
    </div>
  );
}
