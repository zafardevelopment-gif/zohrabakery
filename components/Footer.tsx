import Link from "next/link";
import { ADDRESS, BUSINESS_NAME, PHONE_NUMBERS, PROPRIETOR } from "@/lib/constants";
import { buildWhatsappGeneralLink } from "@/lib/whatsapp";
import { WhatsappIcon } from "@/components/WhatsappButton";

export function Footer() {
  return (
    <footer className="scallop-top mt-16 bg-chocolate pt-10 pb-8 text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-3">
        <div>
          <p className="font-script text-3xl font-bold">{BUSINESS_NAME}</p>
          <p className="mt-2 text-sm text-cream/80">
            Homemade with love by {PROPRIETOR}. 100% Pure Veg.
          </p>
          <Link
            href={buildWhatsappGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
          >
            <WhatsappIcon className="h-4 w-4" />
            Chat on WhatsApp
          </Link>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blush">
            Visit Us
          </p>
          <p className="text-sm text-cream/80">{ADDRESS.line1}</p>
          <p className="text-sm text-cream/80">{ADDRESS.line2}</p>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blush">
            Call Us
          </p>
          {PHONE_NUMBERS.map((phone) => (
            <a
              key={phone.tel}
              href={`tel:${phone.tel}`}
              className="block text-sm text-cream/80 hover:text-blush"
            >
              {phone.display}
            </a>
          ))}
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
      </p>
    </footer>
  );
}
