"use client";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html lang="en">
      <body>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
          <section style={{ maxWidth: 560, textAlign: "center", fontFamily: "sans-serif" }}>
            <p style={{ letterSpacing: "0.24em", textTransform: "uppercase" }}>
              Application error
            </p>
            <h1>eTuitionBD could not render this screen.</h1>
            <p>{error.message || "Refresh the page or try again later."}</p>
          </section>
        </main>
      </body>
    </html>
  );
}
