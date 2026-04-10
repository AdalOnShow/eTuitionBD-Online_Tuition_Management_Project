import Link from "next/link"
import { redirect } from "next/navigation"

import { auth } from "@/auth"
import { LogoutButton } from "@/components/auth/logout-button"
import { TokenPlayground } from "@/components/auth/token-playground"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <main className="mx-auto w-full max-w-4xl space-y-6 px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <LogoutButton />
      </div>

      <section className="space-y-2 rounded-lg border p-4">
        <p>
          <span className="font-medium">User:</span> {session.user.name ?? "Unnamed"}
        </p>
        <p>
          <span className="font-medium">Email:</span> {session.user.email ?? "N/A"}
        </p>
        <p>
          <span className="font-medium">Role:</span> {session.user.role ?? "STUDENT"}
        </p>
        <p>
          <span className="font-medium">Permissions:</span>{" "}
          {session.user.permissions?.join(", ") ?? "N/A"}
        </p>
      </section>

      <section className="flex flex-wrap gap-2">
        <Link href="/dashboard/student" className="rounded-md border px-3 py-2 text-sm">
          Student Zone
        </Link>
        <Link href="/dashboard/tutor" className="rounded-md border px-3 py-2 text-sm">
          Tutor Zone
        </Link>
        <Link href="/dashboard/admin" className="rounded-md border px-3 py-2 text-sm">
          Admin Zone
        </Link>
      </section>

      <TokenPlayground />
    </main>
  )
}
