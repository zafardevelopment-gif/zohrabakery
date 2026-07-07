"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Image from "next/image";
import type { Cake, CakeSize } from "@/lib/types";

interface CakeFormProps {
  initialCake?: Cake;
}

const EMPTY_SIZE: CakeSize = { label: "", price: 0 };

export function CakeForm({ initialCake }: CakeFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialCake);

  const [name, setName] = useState(initialCake?.name ?? "");
  const [category, setCategory] = useState(initialCake?.category ?? "");
  const [description, setDescription] = useState(initialCake?.description ?? "");
  const [image, setImage] = useState(initialCake?.image ?? "");
  const [featured, setFeatured] = useState(initialCake?.featured ?? false);
  const [sizes, setSizes] = useState<CakeSize[]>(
    initialCake?.sizes && initialCake.sizes.length > 0 ? initialCake.sizes : [{ ...EMPTY_SIZE }]
  );

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function updateSize(index: number, patch: Partial<CakeSize>) {
    setSizes((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }

  function addSize() {
    setSizes((prev) => [...prev, { ...EMPTY_SIZE }]);
  }

  function removeSize(index: number) {
    setSizes((prev) => prev.filter((_, i) => i !== index));
  }

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

    setImage(data.url);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const validSizes = sizes.filter((s) => s.label.trim() && s.price > 0);

    if (!name.trim() || validSizes.length === 0) {
      setError("Name and at least one valid size/price are required.");
      setSaving(false);
      return;
    }

    const payload = {
      name: name.trim(),
      category: category.trim() || "Uncategorized",
      description: description.trim(),
      image: image || "/images/cakes/tiramisu.svg",
      featured,
      sizes: validSizes,
    };

    const url = isEditing ? `/api/admin/cakes/${initialCake!.id}` : "/api/admin/cakes";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to save cake.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <label className="block text-sm font-medium text-chocolate">
        Cake Name
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-xl border border-blush-light bg-white px-3 py-2 text-sm text-chocolate focus:border-blush-dark focus:outline-none"
        />
      </label>

      <label className="block text-sm font-medium text-chocolate">
        Category
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Specialty, Classic, Fresh Fruit, Jars, Cookies"
          className="mt-1 w-full rounded-xl border border-blush-light bg-white px-3 py-2 text-sm text-chocolate focus:border-blush-dark focus:outline-none"
        />
      </label>

      <label className="block text-sm font-medium text-chocolate">
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-xl border border-blush-light bg-white px-3 py-2 text-sm text-chocolate focus:border-blush-dark focus:outline-none"
        />
      </label>

      <div>
        <p className="mb-1 text-sm font-medium text-chocolate">Photo</p>

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
          className={`relative flex h-48 w-48 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed bg-blush-light/50 transition-colors ${
            dragActive ? "border-blush-dark bg-blush-light" : "border-blush-light"
          }`}
        >
          {image ? (
            <>
              <Image src={image} alt="Cake preview" fill className="object-cover" />
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
            {image ? "Change Photo" : "Choose Photo"}
          </button>
          {image && (
            <button
              type="button"
              onClick={() => setImage("")}
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

        {showUrlInput && (
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="mt-2 w-full rounded-xl border border-blush-light bg-white px-3 py-2 text-sm text-chocolate focus:border-blush-dark focus:outline-none"
          />
        )}
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-chocolate">Sizes &amp; Prices</p>
        <div className="space-y-2">
          {sizes.map((size, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={size.label}
                onChange={(e) => updateSize(index, { label: e.target.value })}
                placeholder="e.g. 1 kg"
                className="w-1/2 rounded-xl border border-blush-light bg-white px-3 py-2 text-sm text-chocolate focus:border-blush-dark focus:outline-none"
              />
              <input
                type="number"
                min={0}
                value={size.price || ""}
                onChange={(e) => updateSize(index, { price: Number(e.target.value) })}
                placeholder="Price ₹"
                className="w-1/3 rounded-xl border border-blush-light bg-white px-3 py-2 text-sm text-chocolate focus:border-blush-dark focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeSize(index)}
                className="rounded-xl border border-red-300 px-3 text-sm text-red-600 hover:bg-red-50"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addSize}
          className="mt-2 text-sm font-medium text-blush-dark hover:underline"
        >
          + Add another size
        </button>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-chocolate">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="h-4 w-4"
        />
        Feature on homepage
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded-full bg-chocolate px-6 py-3 font-semibold text-cream hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving..." : isEditing ? "Save Changes" : "Add Cake"}
        </button>
      </div>
    </form>
  );
}
