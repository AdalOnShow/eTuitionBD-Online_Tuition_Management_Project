import React from "react";

const Privacy = () => {
  return (
    <main className="min-h-screen bg-base-200">
      {/* Page header */}
      <header className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">Privacy Policy</h1>
        <p className="text-base text-base-content/70 max-w-3xl">This page describes the types of information we collect and how we handle it to support the educational purpose of eTuitionBD while maintaining security and user control.</p>
      </header>

      {/* Content container */}
      <div className="max-w-4xl mx-auto px-4 pb-12 space-y-8">
        {/* Information We Collect */}
        <section className="bg-base-100 border border-base-content/8 rounded-lg p-5 md:p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">Information We Collect</h2>
          <p className="text-sm text-base-content/70">We collect basic account information such as name, email, and role (student or tutor). We also retain tuition-related data including posted requirements, applications, scheduling, and payment references necessary for platform operations.</p>
        </section>

        {/* How We Use Information */}
        <section className="bg-base-100 border border-base-content/8 rounded-lg p-5 md:p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">How We Use Information</h2>
          <p className="text-sm text-base-content/70">Information is used to provide core platform functionality (matching, messaging, and record-keeping), to communicate important updates, and to maintain the security and integrity of the service.</p>
        </section>

        {/* Data Protection */}
        <section className="bg-base-100 border border-base-content/8 rounded-lg p-5 md:p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">Data Protection</h2>
          <p className="text-sm text-base-content/70">We use standard authentication methods (Firebase Authentication) and issue tokens for session management. Access controls and sensible data retention policies are applied to limit exposure of user data.</p>
        </section>

        {/* User Responsibility */}
        <section className="bg-base-100 border border-base-content/8 rounded-lg p-5 md:p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">User Responsibility</h2>
          <p className="text-sm text-base-content/70">Users are responsible for keeping their credentials secure, using unique passwords, and reporting any suspected account compromise to support promptly.</p>
        </section>
      </div>
    </main>
  );
};

export default Privacy;
