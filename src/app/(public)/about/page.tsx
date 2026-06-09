export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,_#f8fafc,_#ecfdf5)] px-4 py-16">
      <section className="mx-auto max-w-5xl space-y-10">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
            About eTuitionBD
          </p>
          <h1 className="font-serif text-5xl font-semibold tracking-tight text-slate-950">
            A practical tuition network for Bangladesh.
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            eTuitionBD is built around the real flow of finding tuition:
            students need clear requirements, tutors need credible profiles, and
            admins need controlled access to manage the marketplace.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Verified access", "Email verification and protected dashboards keep account flows explicit."],
            ["Role-first UX", "Students, tutors, and admins land on routes that match their permissions."],
            ["Profile quality", "Structured profile setup improves matching before deeper marketplace features."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-3xl border bg-white/80 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
