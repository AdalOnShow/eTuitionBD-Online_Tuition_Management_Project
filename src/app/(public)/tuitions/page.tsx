const tuitions = [
  {
    title: "Class 9 Mathematics",
    location: "Dhanmondi, Dhaka",
    budget: "BDT 6,000/mo",
  },
  {
    title: "HSC Physics",
    location: "Chattogram",
    budget: "BDT 8,500/mo",
  },
  {
    title: "English Medium Science",
    location: "Uttara, Dhaka",
    budget: "BDT 10,000/mo",
  },
];

export default function TuitionsPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,_#fff7ed,_#f8fafc_45%,_#ecfdf5)] px-4 py-16">
      <section className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
              Open tuitions
            </p>
            <h1 className="font-serif text-5xl font-semibold tracking-tight text-slate-950">
              Browse real-looking tuition opportunities.
            </h1>
            <p className="text-slate-600">
              This v1 surface is ready for live data. It establishes the route,
              content hierarchy, and empty-state replacement for the marketplace.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {tuitions.map((tuition) => (
            <article
              key={tuition.title}
              className="rounded-3xl border bg-white/85 p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-emerald-700">
                {tuition.location}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                {tuition.title}
              </h2>
              <p className="mt-6 rounded-full bg-slate-950 px-4 py-2 text-center text-sm font-semibold text-white">
                {tuition.budget}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
