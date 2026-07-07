"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImagePicker } from "@/components/admin/ImagePicker";

export function HeroSettingsForm({ initialHeroImage }: { initialHeroImage: string }) {
  const router = useRouter();
  const [heroImage, setHeroImage] = useState(initialHeroImage);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    if (!heroImage.trim()) {
      setError("Hero image is required.");
      setSaving(false);
      return;
    }

    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ heroImage }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to save settings.");
      return;
    }

    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <div>
        <p className="mb-1 text-sm font-medium text-chocolate">Homepage Hero Photo</p>
        <p className="mb-3 text-sm text-chocolate/60">
          This is the round cake photo shown next to the &quot;Zohra Bakery&quot; title
          at the top of the homepage.
        </p>
        <ImagePicker
          value={heroImage}
          onChange={setHeroImage}
          size={56}
          recommendedSize="Recommended size: 800 × 800px (square), JPG/PNG/WEBP, under 1MB — it's shown in a circle, so keep the subject centred"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-green-700">Saved! The homepage will update shortly.</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-full bg-chocolate px-6 py-3 font-semibold text-cream hover:opacity-90 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
