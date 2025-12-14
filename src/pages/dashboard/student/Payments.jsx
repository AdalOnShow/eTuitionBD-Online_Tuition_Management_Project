import { FiDownload, FiDollarSign } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./../../../components/shared/LoadingSpinner";
import useAuth from "./../../../hook/useAuth";
import axios from "axios";

const Payments = () => {
  const { user, loading } = useAuth();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["student-payments", user?.email],
    queryFn: async () => {
      const res = await axios(
        `${import.meta.env.VITE_API_URL}/payments?student_email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const totalPaid = payments
    .filter((p) => p.payment_status === "paid")
    .reduce((sum, p) => sum + p.amount_total, 0);
  const totalPending = payments
    .filter((p) => p.payment_status === "pending")
    .reduce((sum, p) => sum + p.amount_total, 0);


  if (loading || isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Payments</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <FiDollarSign className="text-2xl" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Total Paid</p>
                <p className="text-2xl font-bold">
                  ৳{totalPaid.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center text-warning">
                <FiDollarSign className="text-2xl" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Pending</p>
                <p className="text-2xl font-bold">
                  ৳{totalPending.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center text-success">
                <FiDollarSign className="text-2xl" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">This Month</p>
                <p className="text-2xl font-bold">
                  ৳{totalPaid.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">Payment History</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Tuition Name</th>
                  <th>Tutor Email</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td>{payment.tuition_title}</td>
                    <td>{payment.tutor_email}</td>
                    <td className="font-semibold">
                      ৳{payment.amount_total.toLocaleString()}
                    </td>
                    <td>{new Date(payment.paid_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}</td>
                    <td>{payment.payment_method}</td>
                    <td>
                      <div
                        className={`badge ${
                          payment.payment_status === "paid"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {payment.payment_status}
                      </div>
                    </td>
                    <td>
                      {payment.payment_status === "paid" && (
                        <button className="btn btn-ghost btn-sm">
                          <FiDownload /> Receipt
                        </button>
                      )}
                      {payment.status === "pending" && (
                        <button className="btn btn-primary btn-sm">
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
