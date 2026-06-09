import { LogoutButton } from "@/components/auth/logout-button";

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,_#f8fafc,_#e0f2fe)] px-4 py-10">
      <section className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col justify-between gap-4 rounded-[2rem] border bg-white/80 p-6 shadow-sm md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              Admin dashboard
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
              Operate users, tuition posts, and marketplace quality.
            </h1>
          </div>
          <LogoutButton />
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["User review", "Audit student and tutor accounts as admin APIs come online."],
            ["Tuition moderation", "Keep public listings accurate and safe for applicants."],
            ["System health", "Monitor role access, profile completion, and auth status."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-3xl border bg-white/85 p-6">
              <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
