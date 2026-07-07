"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Cake, CakeSize } from "@/lib/types";
import { ImagePicker } from "@/components/admin/ImagePicker";

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

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateSize(index: number, patch: Partial<CakeSize>) {
    setSizes((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }

  function addSize() {
    setSizes((prev) => [...prev, { ...EMPTY_SIZE }]);
  }

  function removeSize(index: number) {
    setSizes((prev) => prev.filter((_, i) => i !== index));
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
        <ImagePicker
          value={image}
          onChange={setImage}
          recommendedSize="Recommended size: 800 × 600px (4:3 landscape), JPG/PNG/WEBP, under 1MB"
        />
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
          disabled={saving}
          className="rounded-full bg-chocolate px-6 py-3 font-semibold text-cream hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving..." : isEditing ? "Save Changes" : "Add Cake"}
        </button>
      </div>
    </form>
  );
}
