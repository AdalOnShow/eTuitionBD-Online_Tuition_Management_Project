import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-screen w-full max-w-3xl place-items-center px-4 text-center">
      <section className="space-y-6 rounded-[2rem] border bg-card p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
          404
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          This tuition route does not exist.
        </h1>
        <p className="text-muted-foreground">
          The page may have moved, or the subdomain route may not match an
          active eTuitionBD surface.
        </p>
        <Button asChild>
          <Link href="/">Return home</Link>
        </Button>
      </section>
    </main>
  );
}
