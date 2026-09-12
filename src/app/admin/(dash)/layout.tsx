import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { SetupNotice } from "@/components/admin/setup-notice";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getSessionUser } from "@/lib/supabase/server";
import { adminInquiryCounts } from "@/lib/admin-data";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) return <SetupNotice />;

  const user = await getSessionUser();
  if (!user) redirect("/admin/login");

  const counts = await adminInquiryCounts();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar email={user.email ?? "admin"} newCount={counts.new} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
