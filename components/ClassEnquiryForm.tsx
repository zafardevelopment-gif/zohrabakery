"use client";

import { useState } from "react";
import { WhatsappButton } from "@/components/WhatsappButton";
import { buildWhatsappClassEnquiryLink } from "@/lib/whatsapp";

export function ClassEnquiryForm() {
  const [name, setName] = useState("");

  return (
    <div className="mx-auto max-w-sm space-y-4">
      <label className="block text-sm font-medium text-chocolate">
        Your name (optional)
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Fatima"
          className="mt-1 w-full rounded-xl border border-blush-light bg-white px-3 py-2 text-sm text-chocolate focus:border-blush-dark focus:outline-none"
        />
      </label>
      <WhatsappButton href={buildWhatsappClassEnquiryLink(name || undefined)} className="w-full">
        Enquire on WhatsApp
      </WhatsappButton>
    </div>
  );
}
