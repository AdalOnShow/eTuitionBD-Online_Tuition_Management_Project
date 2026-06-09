import { auth } from "@/lib/auth";
import { getDashboardPath } from "@/lib/destinations";
import { redirect } from "next/navigation";

export default async function DashboardRedirectPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  redirect(getDashboardPath(session.user.role));
}
