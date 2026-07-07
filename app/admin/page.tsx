import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getAllCakes } from "@/lib/cakes";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { CakeAdminList } from "@/components/admin/CakeAdminList";

export default async function AdminDashboardPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const cakes = await getAllCakes();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <AdminHeader title="Manage Cakes" />

      <div className="mt-6 flex justify-end">
        <Link
          href="/admin/cakes/new"
          className="rounded-full bg-chocolate px-5 py-2.5 text-sm font-semibold text-cream hover:opacity-90"
        >
          + Add New Cake
        </Link>
      </div>

      <CakeAdminList cakes={cakes} />
    </div>
  );
}
