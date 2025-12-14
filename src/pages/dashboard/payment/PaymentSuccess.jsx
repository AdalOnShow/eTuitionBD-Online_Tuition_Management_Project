import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiDownload,
  FiArrowLeft,
  FiCreditCard,
  FiUser,
  FiBook,
  FiDollarSign,
} from "react-icons/fi";
import Swal from "sweetalert2";
import axios from "axios";
import { useRef } from "react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);
  const isMountedRef = useRef(false);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (isMountedRef.current) return;
    isMountedRef.current = true;

    if (!sessionId) {
      setError("Payment session not found");
      setLoading(false);
      return;
    }

    const confirmPayment = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/payment-success`,
          {
            sessionId: sessionId,
          }
        );

        if (response.data) {
          setPaymentData({
            tuition_title: response.data.tuition_title || "Sample Tuition",
            tuition_subject: response.data.tuition_subject || "Sample Subject",
            tutor_email: response.data.tutor_email || "tutor@gmail.com",
            amount_total: response.data.amount_total || 100,
            payment_method: response.data.payment_method || "card",
            payment_status: response.data.payment_status || "paid",
            transcaction_id: response.data.transcaction_id || sessionId,
            paid_at: response.data.paid_at || new Date().toISOString(),
          });

          setLoading(false);

          Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            text: "Your payment has been processed successfully.",
            timer: 3000,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.error("Payment confirmation error:", error);
        if (error.response?.status === 400) {
          setError("Payment already processed or invalid session");
        } else {
          setError("Failed to confirm payment. Please contact support.");
        }

        setLoading(false);

        Swal.fire({
          icon: "error",
          title: "Payment Confirmation Failed",
          text: "There was an issue confirming your payment. Please contact support if money was deducted.",
        });
      }
    };

    confirmPayment();
  }, [sessionId]);

  const handleDownloadReceipt = () => {
    const receiptContent = `
      eTuitionBD Payment Receipt
      ========================
      
      Transaction ID: ${paymentData?.transcaction_id}
      Date: ${new Date(paymentData?.paid_at).toLocaleDateString()}
      
      Tuition Details:
      - Title: ${paymentData?.tuition_title}
      - Subject: ${paymentData?.tuition_subject}
      - Tutor: ${paymentData?.tutor_email}
      
      Payment Details:
      - Amount: $${paymentData?.amount_total}
      - Method: ${paymentData?.payment_method}
      - Status: ${paymentData?.payment_status}
      
      Thank you for using eTuitionBD!
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eTuitionBD-Receipt-${paymentData?.transcaction_id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-lg">Confirming your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card bg-base-100 shadow-xl max-w-md w-full mx-4">
          <div className="card-body text-center">
            <div className="text-error text-6xl mb-4">
              <FiCreditCard />
            </div>
            <h2 className="card-title text-error justify-center text-2xl mb-2">
              Payment Error
            </h2>
            <p className="text-base-content/70 mb-6">{error}</p>
            <div className="card-actions justify-center gap-4">
              <Link
                to="/dashboard/student/payments"
                className="btn btn-primary"
              >
                <FiArrowLeft /> View Payments
              </Link>
              <Link to="/dashboard" className="btn btn-ghost">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body text-center">
              <div className="text-success text-6xl mb-4">
                <FiCheckCircle />
              </div>
              <h1 className="text-3xl font-bold text-success mb-2">
                Payment Successful!
              </h1>
              <p className="text-base-content/70 text-lg">
                Your payment has been processed successfully. You can now start
                your tuition sessions.
              </p>
            </div>
          </div>

          {/* Payment Details */}
          {paymentData && (
            <div className="card bg-base-100 shadow-xl mb-6">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Payment Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                    <FiBook className="text-primary text-xl" />
                    <div>
                      <p className="text-sm text-base-content/70">Tuition</p>
                      <p className="font-semibold">
                        {paymentData.tuition_title}
                      </p>
                      <p className="text-sm text-base-content/70">
                        {paymentData.tuition_subject}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                    <FiUser className="text-primary text-xl" />
                    <div>
                      <p className="text-sm text-base-content/70">Tutor</p>
                      <p className="font-semibold">{paymentData.tutor_email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                    <FiDollarSign className="text-success text-xl" />
                    <div>
                      <p className="text-sm text-base-content/70">
                        Amount Paid
                      </p>
                      <p className="font-semibold text-lg">
                        ${paymentData.amount_total}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                    <FiCreditCard className="text-primary text-xl" />
                    <div>
                      <p className="text-sm text-base-content/70">
                        Payment Method
                      </p>
                      <p className="font-semibold capitalize">
                        {paymentData.payment_method}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-base-content/70">
                      Transaction ID:
                    </span>
                    <span className="font-mono ml-2">
                      {paymentData.transcaction_id}
                    </span>
                  </div>
                  <div>
                    <span className="text-base-content/70">Payment Date:</span>
                    <span className="ml-2">
                      {new Date(paymentData.paid_at).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-base-content/70">Status:</span>
                    <span className="badge badge-success ml-2 capitalize">
                      {paymentData.payment_status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4">What's Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleDownloadReceipt}
                  className="btn btn-outline btn-primary"
                  disabled={!paymentData}
                >
                  <FiDownload /> Download Receipt
                </button>

                <Link
                  to="/dashboard/student/payments"
                  className="btn btn-ghost"
                >
                  <FiArrowLeft /> View All Payments
                </Link>

                <Link
                  to="/dashboard/student/my-tuitions"
                  className="btn btn-primary"
                >
                  View My Tuitions
                </Link>

                <Link to="/dashboard" className="btn btn-ghost">
                  Go to Dashboard
                </Link>
              </div>

              <div className="alert alert-info mt-4">
                <div>
                  <h4 className="font-semibold">Important:</h4>
                  <p className="text-sm">
                    Your tutor has been notified about the payment. They will
                    contact you soon to schedule your first session. Keep your
                    transaction ID for future reference.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
