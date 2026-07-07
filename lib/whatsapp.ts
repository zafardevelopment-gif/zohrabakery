import { WHATSAPP_NUMBER } from "@/lib/constants";
import type { Cake, CakeSize } from "@/lib/types";

export interface OrderNotes {
  date?: string;
  cakeMessage?: string;
  instructions?: string;
}

function buildWhatsappLink(message: string, number: string = WHATSAPP_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsappOrderLink(
  cake: Cake,
  size: CakeSize,
  notes: OrderNotes = {}
) {
  const lines = [
    `Hi Zohra Bakery! 👋🍰 I'd like to order:`,
    ``,
    `🎂 Cake: ${cake.name}`,
    `⚖️ Size: ${size.label}`,
  ];

  if (notes.date) lines.push(`📅 Needed on: ${notes.date}`);
  if (notes.cakeMessage) lines.push(`📝 Message on cake: ${notes.cakeMessage}`);
  if (notes.instructions) lines.push(`ℹ️ Notes: ${notes.instructions}`);

  lines.push(``, `✅ Please confirm availability and total cost. Thank you! 😊🙏`);

  return buildWhatsappLink(lines.join("\n"));
}

export function buildWhatsappClassEnquiryLink(name?: string) {
  const lines = [
    `Hi Zohra Bakery! 👋🎓 I'm interested in the Cake & Bakery Classes.`,
    ``,
    ...(name ? [`🙋 Name: ${name}`] : []),
    `📋 Please share the details, schedule, and fees. Thank you! 😊🙏`,
  ];

  return buildWhatsappLink(lines.join("\n"));
}

export function buildWhatsappGeneralLink() {
  return buildWhatsappLink(
    `Hi Zohra Bakery! 👋🍰 I'd like to know more about your cakes. 😊`
  );
}
