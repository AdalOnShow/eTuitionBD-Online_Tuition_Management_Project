"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto grid min-h-screen w-full max-w-2xl place-items-center px-4 text-center">
      <section className="space-y-5 rounded-3xl border bg-card p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-destructive">
          Route error
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Something broke while loading this page.
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">
          {error.message || "Try again. If the issue repeats, contact support."}
        </p>
        <Button type="button" onClick={reset}>
          Try again
        </Button>
      </section>
    </main>
  );
}
