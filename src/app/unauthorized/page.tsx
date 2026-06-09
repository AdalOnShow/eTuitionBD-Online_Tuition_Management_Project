import Link from "next/link";

import { auth } from "@/lib/auth";
import { getDashboardPath } from "@/lib/destinations";

export default async function UnauthorizedPage() {
  const session = await auth();
  const dashboardPath = session ? getDashboardPath(session.user.role) : "/";

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-2xl place-items-center px-4 text-center">
      <section className="space-y-5 rounded-3xl border bg-card p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-destructive">
          Unauthorized
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          This route is not available for your role.
        </h1>
        <p className="text-muted-foreground text-sm leading-6">
          eTuitionBD separates student, tutor, and admin surfaces. Return to
          your assigned dashboard or start from the public home page.
        </p>
        <Link
          href={dashboardPath}
          className="inline-flex rounded-full border px-5 py-2 text-sm font-medium hover:bg-muted"
        >
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
