import { FiDownload, FiDollarSign } from "react-icons/fi";

const Payments = () => {
  const payments = [
    {
      id: 1,
      tutorName: "Dr. Ahmed Rahman",
      amount: 8000,
      date: "2024-01-20",
      status: "Paid",
      method: "bKash"
    },
    {
      id: 2,
      tutorName: "Fatima Khan",
      amount: 12000,
      date: "2024-01-15",
      status: "Paid",
      method: "Nagad"
    },
    {
      id: 3,
      tutorName: "Karim Hossain",
      amount: 10000,
      date: "2024-02-01",
      status: "Pending",
      method: "Bank Transfer"
    }
  ];

  const totalPaid = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);

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
                <p className="text-2xl font-bold">৳{totalPaid.toLocaleString()}</p>
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
                <p className="text-2xl font-bold">৳{totalPending.toLocaleString()}</p>
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
                <p className="text-2xl font-bold">৳{totalPaid.toLocaleString()}</p>
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
                  <th>Tutor Name</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.tutorName}</td>
                    <td className="font-semibold">৳{payment.amount.toLocaleString()}</td>
                    <td>{payment.date}</td>
                    <td>{payment.method}</td>
                    <td>
                      <div className={`badge ${payment.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                        {payment.status}
                      </div>
                    </td>
                    <td>
                      {payment.status === 'Paid' && (
                        <button className="btn btn-ghost btn-sm">
                          <FiDownload /> Receipt
                        </button>
                      )}
                      {payment.status === 'Pending' && (
                        <button className="btn btn-primary btn-sm">Pay Now</button>
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
