import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FiXCircle, FiArrowLeft, FiRefreshCw, FiCreditCard, FiBook, FiUser, FiDollarSign } from "react-icons/fi";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [tuitionData, setTuitionData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get tuition details from URL params if available
  const tuitionId = searchParams.get("tuition_id");
  const tutorEmail = searchParams.get("tutor_email");
  const amount = searchParams.get("amount");

  useEffect(() => {
    const fetchTuitionData = async () => {
      if (tuitionId) {
        try {
          const response = await axiosSecure.get(`/tuition/${tuitionId}`);
          setTuitionData(response.data);
        } catch (error) {
          console.error("Error fetching tuition data:", error);
        }
      }
      setLoading(false);
    };

    fetchTuitionData();
  }, [tuitionId, axiosSecure]);

  const handleRetryPayment = () => {
    // Navigate back to the payment page or trigger payment flow again
    if (tuitionId) {
      // You can implement the payment retry logic here
      // For now, we'll redirect to the tuition details or payments page
      window.location.href = `/dashboard/student/payments`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Cancel Header */}
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body text-center">
              <div className="text-warning text-6xl mb-4">
                <FiXCircle />
              </div>
              <h1 className="text-3xl font-bold text-warning mb-2">
                Payment Cancelled
              </h1>
              <p className="text-base-content/70 text-lg">
                Your payment was cancelled. No charges have been made to your account.
              </p>
            </div>
          </div>

          {/* Payment Details (if available) */}
          {(tuitionData || tutorEmail || amount) && (
            <div className="card bg-base-100 shadow-xl mb-6">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Cancelled Payment Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tuitionData && (
                    <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <FiBook className="text-primary text-xl" />
                      <div>
                        <p className="text-sm text-base-content/70">Tuition</p>
                        <p className="font-semibold">{tuitionData.title}</p>
                        <p className="text-sm text-base-content/70">{tuitionData.subject}</p>
                      </div>
                    </div>
                  )}

                  {tutorEmail && (
                    <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <FiUser className="text-primary text-xl" />
                      <div>
                        <p className="text-sm text-base-content/70">Tutor</p>
                        <p className="font-semibold">{tutorEmail}</p>
                      </div>
                    </div>
                  )}

                  {amount && (
                    <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <FiDollarSign className="text-warning text-xl" />
                      <div>
                        <p className="text-sm text-base-content/70">Amount</p>
                        <p className="font-semibold text-lg">${amount}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                    <FiCreditCard className="text-warning text-xl" />
                    <div>
                      <p className="text-sm text-base-content/70">Status</p>
                      <p className="font-semibold text-warning">Cancelled</p>
                    </div>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="text-sm text-base-content/70">
                  <p><strong>Cancellation Time:</strong> {new Date().toLocaleString()}</p>
                  <p><strong>Reason:</strong> Payment cancelled by user</p>
                </div>
              </div>
            </div>
          )}

          {/* Reasons for Cancellation */}
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4">Common Reasons for Payment Cancellation</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-sm">Changed your mind about the tuition</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-sm">Payment method issues or insufficient funds</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-sm">Technical issues during payment process</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-sm">Need to review tuition details again</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4">What would you like to do?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tuitionId && (
                  <button 
                    onClick={handleRetryPayment}
                    className="btn btn-primary"
                  >
                    <FiRefreshCw /> Try Payment Again
                  </button>
                )}
                
                <Link to="/dashboard/student/payments" className="btn btn-ghost">
                  <FiArrowLeft /> View Payment History
                </Link>
                
                <Link to="/dashboard/student/my-tuitions" className="btn btn-outline">
                  View My Tuitions
                </Link>
                
                <Link to="/tuitions" className="btn btn-outline">
                  Browse Other Tuitions
                </Link>
              </div>
              
              <div className="alert alert-warning mt-4">
                <div>
                  <h4 className="font-semibold">Need Help?</h4>
                  <p className="text-sm">
                    If you're experiencing technical issues or need assistance with payment, 
                    please contact our support team. We're here to help you complete your tuition booking.
                  </p>
                  <div className="mt-2">
                    <Link to="/contact" className="btn btn-sm btn-warning">
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;