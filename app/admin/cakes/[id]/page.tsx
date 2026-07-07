import { notFound, redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getCakeById } from "@/lib/cakes";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { CakeForm } from "@/components/admin/CakeForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCakePage({ params }: PageProps) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const cake = await getCakeById(id);

  if (!cake) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <AdminHeader title={`Edit ${cake.name}`} />
      <CakeForm initialCake={cake} />
    </div>
  );
}
