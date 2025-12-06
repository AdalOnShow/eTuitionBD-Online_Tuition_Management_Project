import { FiDollarSign, FiTrendingUp } from "react-icons/fi";

const RevenueHistory = () => {
  const revenues = [
    {
      id: 1,
      month: "January 2024",
      studentName: "Karim Ahmed",
      subject: "Mathematics",
      amount: 8000,
      status: "Received",
      date: "2024-01-31"
    },
    {
      id: 2,
      month: "January 2024",
      studentName: "Sara Rahman",
      subject: "Physics",
      amount: 12000,
      status: "Received",
      date: "2024-01-31"
    },
    {
      id: 3,
      month: "February 2024",
      studentName: "Karim Ahmed",
      subject: "Mathematics",
      amount: 8000,
      status: "Pending",
      date: "2024-02-28"
    }
  ];

  const totalEarned = revenues.filter(r => r.status === 'Received').reduce((sum, r) => sum + r.amount, 0);
  const pendingAmount = revenues.filter(r => r.status === 'Pending').reduce((sum, r) => sum + r.amount, 0);
  const thisMonth = revenues.filter(r => r.month === 'February 2024').reduce((sum, r) => sum + r.amount, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Revenue History</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card bg-gradient-to-br from-primary to-primary-focus text-primary-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FiDollarSign className="text-2xl" />
              </div>
              <div>
                <p className="text-sm opacity-90">Total Earned</p>
                <p className="text-3xl font-bold">৳{totalEarned.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-warning to-warning-focus text-warning-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FiDollarSign className="text-2xl" />
              </div>
              <div>
                <p className="text-sm opacity-90">Pending</p>
                <p className="text-3xl font-bold">৳{pendingAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-success to-success-focus text-success-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="text-2xl" />
              </div>
              <div>
                <p className="text-sm opacity-90">This Month</p>
                <p className="text-3xl font-bold">৳{thisMonth.toLocaleString()}</p>
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
                  <th>Month</th>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {revenues.map((revenue) => (
                  <tr key={revenue.id}>
                    <td>{revenue.month}</td>
                    <td>{revenue.studentName}</td>
                    <td>{revenue.subject}</td>
                    <td className="font-semibold text-success">৳{revenue.amount.toLocaleString()}</td>
                    <td>{revenue.date}</td>
                    <td>
                      <div className={`badge ${revenue.status === 'Received' ? 'badge-success' : 'badge-warning'}`}>
                        {revenue.status}
                      </div>
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

export default RevenueHistory;
