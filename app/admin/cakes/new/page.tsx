import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { CakeForm } from "@/components/admin/CakeForm";

export default async function NewCakePage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <AdminHeader title="Add New Cake" />
      <CakeForm />
    </div>
  );
}
