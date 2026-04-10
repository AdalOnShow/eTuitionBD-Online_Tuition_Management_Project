import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold">Unauthorized</h1>
      <p className="text-muted-foreground text-sm">
        You do not have permission to access this page.
      </p>
      <Link href="/dashboard" className="rounded-md border px-3 py-2 text-sm">
        Back to dashboard
      </Link>
    </main>
  )
}
