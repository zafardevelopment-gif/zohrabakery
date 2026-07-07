"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminHeader({ title }: { title: string }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex items-center justify-between border-b border-blush-light pb-4">
      <div>
        <Link href="/admin" className="font-script text-2xl font-bold text-chocolate">
          Zohra Bakery Admin
        </Link>
        <h1 className="mt-1 text-xl font-semibold text-chocolate">{title}</h1>
      </div>
      <button
        onClick={handleLogout}
        className="rounded-full border-2 border-chocolate px-4 py-2 text-sm font-semibold text-chocolate hover:bg-chocolate hover:text-cream"
      >
        Log Out
      </button>
    </div>
  );
}
