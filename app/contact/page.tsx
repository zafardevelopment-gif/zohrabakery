import type { Metadata } from "next";
import { ADDRESS, BUSINESS_HOURS, PHONE_NUMBERS } from "@/lib/constants";
import { WhatsappButton } from "@/components/WhatsappButton";
import { buildWhatsappGeneralLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Visit or call Zohra Bakery at Zohra Manzil, Safa Nagar Colony, Phulwari Road, Kishanganj, Bihar. Order homemade cakes on WhatsApp today.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <h1 className="font-script text-5xl font-bold text-chocolate sm:text-6xl">
          Get In Touch
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-chocolate/70">
          We&apos;d love to bake something special for you. Reach out any time.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blush-light">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-blush-dark">
              Address
            </h2>
            <p className="mt-2 text-chocolate/80">{ADDRESS.line1}</p>
            <p className="text-chocolate/80">{ADDRESS.line2}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${ADDRESS.mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-blush-dark hover:underline"
            >
              Get Directions →
            </a>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blush-light">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-blush-dark">
              Call Us
            </h2>
            <div className="mt-2 space-y-1">
              {PHONE_NUMBERS.map((phone) => (
                <a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  className="block font-medium text-chocolate hover:text-blush-dark"
                >
                  {phone.display}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-blush-light">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-blush-dark">
              Business Hours
            </h2>
            <p className="mt-2 text-chocolate/80">{BUSINESS_HOURS}</p>
          </div>

          <WhatsappButton href={buildWhatsappGeneralLink()} className="w-full">
            Message on WhatsApp
          </WhatsappButton>
        </div>

        <div className="overflow-hidden rounded-3xl shadow-sm ring-1 ring-blush-light">
          <iframe
            title="Zohra Bakery location map"
            src={`https://www.google.com/maps?q=${ADDRESS.mapsQuery}&output=embed`}
            className="h-full min-h-[400px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
