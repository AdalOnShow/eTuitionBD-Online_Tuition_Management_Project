import Link from "next/link";
import * as React from "react";

type AuthShellProps = {
  children: React.ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="border-border bg-background hover:bg-muted absolute top-4 left-4 inline-flex rounded-lg border px-3 py-2 text-sm font-medium transition-colors sm:top-6 sm:left-6"
      >
        Home
      </Link>
      <section className="w-full max-w-2xl">{children}</section>
    </main>
  );
}
