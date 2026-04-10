import DashboardClientLayout from "@/components/DashboardClientLayout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}