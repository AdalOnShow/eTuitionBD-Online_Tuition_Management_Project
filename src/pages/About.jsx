import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="min-h-screen bg-base-200">
      {/* Page header */}
      <header className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
          About eTuitionBD
        </h1>
        <p className="text-base text-base-content/70 max-w-3xl">
          eTuitionBD is an academic tuition platform that connects students with
          qualified tutors across Bangladesh. The platform is designed for
          students seeking subject-specific tuition and tutors offering
          instruction, with administrative oversight to ensure safe and
          appropriate matching.
        </p>
      </header>

      {/* Content container */}
      <div className="max-w-4xl mx-auto px-4 pb-12 space-y-8">
        {/* Our Mission */}
        <section className="bg-base-100 border border-base-content/8 rounded-lg p-5 md:p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-sm text-base-content/70 leading-relaxed">
            To improve access to quality tuition by providing a structured,
            transparent platform where students can find qualified tutors and
            where tutors can present their teaching approach and credentials.
          </p>
        </section>

        {/* How the Platform Works */}
        <section className="bg-base-100 border border-base-content/8 rounded-lg p-5 md:p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3">
            How the Platform Works
          </h2>
          <ol className="list-decimal list-inside text-sm text-base-content/70 space-y-2 leading-relaxed">
            <li>Student posts a tuition request with requirements and schedule.</li>
            <li>Tutors apply with proposals and suggested plans.</li>
            <li>Admin reviews activity for compliance; student confirms a tutor.</li>
          </ol>
        </section>

        {/* Why eTuitionBD */}
        <section className="bg-base-100 border border-base-content/8 rounded-lg p-5 md:p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3">Why eTuitionBD</h2>
          <ul className="list-disc list-inside text-sm text-base-content/70 space-y-2 leading-relaxed">
            <li>Secure role-based access for students, tutors, and administrators.</li>
            <li>Transparent tuition postings and application records for auditability.</li>
            <li>Academic-focused matching that emphasises subject fit and credentials.</li>
            <li>Simple workflows to support rapid, safe tutor selection.</li>
          </ul>
        </section>

        {/* Contact Link */}
        <div className="text-sm text-base-content/70">
          <Link to="/contact" className="link link-primary">
            Contact us for institutional queries
          </Link>
        </div>
      </div>
    </main>
  );
};

export default About