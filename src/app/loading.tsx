export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-4">
      <div className="w-full max-w-md space-y-4 rounded-3xl border bg-card p-6 shadow-sm">
        <div className="h-4 w-24 animate-pulse rounded-full bg-muted" />
        <div className="h-8 w-3/4 animate-pulse rounded-full bg-muted" />
        <div className="space-y-2">
          <div className="h-3 animate-pulse rounded-full bg-muted" />
          <div className="h-3 w-5/6 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </main>
  );
}
