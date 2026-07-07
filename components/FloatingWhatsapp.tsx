import Link from "next/link";
import { buildWhatsappGeneralLink } from "@/lib/whatsapp";
import { WhatsappIcon } from "@/components/WhatsappButton";

export function FloatingWhatsapp() {
  return (
    <Link
      href={buildWhatsappGeneralLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Zohra Bakery on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 transition-transform hover:scale-110 active:scale-95 md:bottom-8 md:right-8"
    >
      <WhatsappIcon className="h-7 w-7" />
    </Link>
  );
}
