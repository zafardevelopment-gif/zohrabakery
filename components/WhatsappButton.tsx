import Link from "next/link";
import { cn } from "@/lib/utils";

interface WhatsappButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}

export function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.34.652 4.523 1.785 6.393L4 29l7.81-1.75A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.7a9.66 9.66 0 0 1-4.93-1.35l-.353-.21-4.633 1.038 1.02-4.51-.23-.366A9.63 9.63 0 0 1 5.3 15c0-5.902 4.8-10.7 10.704-10.7 5.902 0 10.7 4.798 10.7 10.7 0 5.903-4.798 10.7-10.7 10.7Zm5.87-8.016c-.322-.161-1.902-.938-2.197-1.046-.295-.108-.51-.161-.724.161-.214.322-.83 1.046-1.018 1.26-.187.215-.375.242-.696.081-.322-.161-1.36-.501-2.591-1.6-.958-.854-1.605-1.908-1.793-2.23-.187-.322-.02-.496.141-.657.145-.144.322-.375.483-.563.161-.188.214-.322.322-.537.107-.215.053-.402-.027-.563-.08-.161-.723-1.746-.992-2.392-.261-.63-.526-.545-.723-.556l-.616-.011c-.214 0-.563.08-.858.402-.295.322-1.126 1.1-1.126 2.685 0 1.585 1.153 3.117 1.314 3.332.161.215 2.269 3.465 5.498 4.859.768.331 1.367.529 1.834.677.77.245 1.47.21 2.024.128.618-.092 1.902-.777 2.17-1.528.267-.75.267-1.393.187-1.528-.08-.134-.294-.215-.616-.376Z" />
    </svg>
  );
}

export function WhatsappButton({
  href,
  children,
  variant = "solid",
  className,
}: WhatsappButtonProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-transform hover:scale-105 active:scale-95",
        variant === "solid"
          ? "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30"
          : "border-2 border-chocolate text-chocolate hover:bg-chocolate hover:text-cream",
        className
      )}
    >
      <WhatsappIcon className="h-5 w-5 shrink-0" />
      {children}
    </Link>
  );
}
