import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiDollarSign } from "react-icons/fi";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import useAuth from "../../../hook/useAuth";

const RevenueHistory = () => {
  const { user, loading } = useAuth();
  const { data: revenues = [], isLoading } = useQuery({
    queryKey: ["tutor-revenues", user?.email],
    queryFn: async () => {
      const res = await axios(
        `${import.meta.env.VITE_API_URL}/payments?tutor_email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const totalEarned = revenues
    .filter((r) => r.payment_status === "paid")
    .reduce((sum, r) => sum + r.amount_total, 0);
  const pendingAmount = revenues
    .filter((r) => r.payment_status === "rending")
    .reduce((sum, r) => sum + r.amount_total, 0);

  if (loading || isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Revenue History</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card bg-linear-to-br from-primary to-primary-focus text-primary-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FiDollarSign className="text-2xl" />
              </div>
              <div>
                <p className="text-sm opacity-90">Total Earned</p>
                <p className="text-3xl font-bold">
                  ৳{totalEarned.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-linear-to-br from-warning to-warning-focus text-warning-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FiDollarSign className="text-2xl" />
              </div>
              <div>
                <p className="text-sm opacity-90">Pending</p>
                <p className="text-3xl font-bold">
                  ৳{pendingAmount.toLocaleString()}
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
                  <th>Tuition Title</th>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {revenues && revenues.length > 0 ? (
                  revenues.map((revenue) => (
                    <tr key={revenue._id}>
                      <td>{revenue.tuition_title}</td>
                      <td>{revenue.student_email}</td>
                      <td>{revenue.tuition_subject}</td>
                      <td className="font-semibold text-success">
                        ৳{revenue.amount_total.toLocaleString()}
                      </td>
                      <td>
                        {new Date(revenue.paid_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td>
                        <div
                          className={`badge ${
                            revenue.payment_status === "paid"
                              ? "badge-success"
                              : "badge-warning"
                          }`}
                        >
                          {revenue.payment_status}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <div className="text-6xl mb-4">💰</div>
                      <h3 className="text-xl font-semibold mb-2">
                        No Earnings Yet
                      </h3>
                      <p className="text-base-content/70">
                        You haven't earned any revenue yet. Start teaching to
                        see your earnings here!
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueHistory;
