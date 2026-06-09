import type { ReactNode } from "react";

type ProfileFrameProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function ProfileFrame({
  eyebrow,
  title,
  description,
  children,
}: ProfileFrameProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.22),_transparent_34%),linear-gradient(135deg,_#f8fafc,_#ecfdf5_48%,_#fff7ed)] px-4 py-10">
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
            {eyebrow}
          </p>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-lg text-base leading-7 text-slate-600">
            {description}
          </p>
        </div>
        {children}
      </section>
    </main>
  );
}
