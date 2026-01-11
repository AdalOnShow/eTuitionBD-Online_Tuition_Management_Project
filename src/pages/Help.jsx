import React from "react";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <main className="min-h-screen bg-base-200">
      {/* Page header */}
      <header className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">Help & Support</h1>
        <p className="text-base text-base-content/70 max-w-3xl">Find answers to common questions about posting and applying to tuitions, payments, and account safety. If you need further assistance, our support team is available via the Contact page.</p>
      </header>

      {/* Content container */}
      <div className="max-w-4xl mx-auto px-4 pb-12 space-y-8">
        {/* FAQs Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div className="bg-base-100 border border-base-content/8 rounded-lg p-4 md:p-5 shadow-sm">
              <p className="font-semibold text-sm">How do I apply to a tuition?</p>
              <p className="text-sm text-base-content/70 mt-2">Open the tuition details and click <strong>Apply</strong>, then submit your proposed rate and brief teaching plan.</p>
            </div>

            <div className="bg-base-100 border border-base-content/8 rounded-lg p-4 md:p-5 shadow-sm">
              <p className="font-semibold text-sm">How are payments recorded?</p>
              <p className="text-sm text-base-content/70 mt-2">Payments are arranged between student and tutor; the platform records payment history in the student Payments page for reference.</p>
            </div>

            <div className="bg-base-100 border border-base-content/8 rounded-lg p-4 md:p-5 shadow-sm">
              <p className="font-semibold text-sm">What if I need to change the schedule?</p>
              <p className="text-sm text-base-content/70 mt-2">Coordinate with the tutor through the application/chat process; update the tuition schedule in your dashboard if changes are needed.</p>
            </div>

            <div className="bg-base-100 border border-base-content/8 rounded-lg p-4 md:p-5 shadow-sm">
              <p className="font-semibold text-sm">How do I report an issue or a suspicious profile?</p>
              <p className="text-sm text-base-content/70 mt-2">Use the profile reporting option or contact support via the Contact page; provide the tuition or tutor profile link and a short description.</p>
            </div>

            <div className="bg-base-100 border border-base-content/8 rounded-lg p-4 md:p-5 shadow-sm">
              <p className="font-semibold text-sm">Can I edit or cancel my posted tuition?</p>
              <p className="text-sm text-base-content/70 mt-2">Yes — go to <strong>My Tuitions</strong> in your dashboard to edit or cancel; applied tutors will be notified automatically.</p>
            </div>
          </div>
        </section>

        {/* Need More Help Section */}
        <section className="bg-base-100 border border-base-content/8 rounded-lg p-5 md:p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">Need More Help?</h2>
          <p className="text-sm text-base-content/70">If your question is not covered above, please reach out to our support team via the <Link to="/contact" className="link link-primary">Contact</Link> page. Do not duplicate support requests — include relevant tuition or profile links for faster handling.</p>
        </section>

        {/* Account & Safety Section */}
        <section className="bg-base-100 border border-base-content/8 rounded-lg p-5 md:p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">Account &amp; Safety</h2>
          <p className="text-sm text-base-content/70">Keep your account credentials confidential. If you suspect unauthorized access, change your password immediately and notify support. Use profile reports for policy violations or inappropriate conduct.</p>
        </section>
      </div>
    </main>
  );
};

export default Help;
