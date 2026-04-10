export default function AdminDashboardPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-3 px-4 py-10">
      <h1 className="text-2xl font-semibold">Admin Zone</h1>
      <p className="text-muted-foreground text-sm">
        Only ADMIN users can access this route.
      </p>
    </main>
  );
}
