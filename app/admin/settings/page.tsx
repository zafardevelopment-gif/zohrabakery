import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getHeroImage } from "@/lib/settings";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { HeroSettingsForm } from "@/components/admin/HeroSettingsForm";

export default async function AdminSettingsPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const heroImage = await getHeroImage();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <AdminHeader title="Site Settings" />
      <HeroSettingsForm initialHeroImage={heroImage} />
    </div>
  );
}
