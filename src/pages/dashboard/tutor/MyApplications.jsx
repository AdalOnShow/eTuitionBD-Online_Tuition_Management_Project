import { FiEye, FiClock } from "react-icons/fi";

const MyApplications = () => {
  const applications = [
    {
      id: 1,
      tuitionTitle: "Need Math Tutor for Class 10",
      subject: "Mathematics",
      location: "Dhanmondi, Dhaka",
      salary: "৳8,000/month",
      appliedDate: "2024-01-16",
      status: "Pending"
    },
    {
      id: 2,
      tuitionTitle: "Physics Teacher Required",
      subject: "Physics",
      location: "Gulshan, Dhaka",
      salary: "৳12,000/month",
      appliedDate: "2024-01-14",
      status: "Accepted"
    },
    {
      id: 3,
      tuitionTitle: "Chemistry Tutor Needed",
      subject: "Chemistry",
      location: "Mirpur, Dhaka",
      salary: "৳10,000/month",
      appliedDate: "2024-01-12",
      status: "Rejected"
    }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      Pending: 'badge-warning',
      Accepted: 'badge-success',
      Rejected: 'badge-error'
    };
    return badges[status] || 'badge-ghost';
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Total Applications</div>
            <div className="stat-value text-primary">{applications.length}</div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Accepted</div>
            <div className="stat-value text-success">
              {applications.filter(a => a.status === 'Accepted').length}
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Pending</div>
            <div className="stat-value text-warning">
              {applications.filter(a => a.status === 'Pending').length}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Tuition Title</th>
                  <th>Subject</th>
                  <th>Location</th>
                  <th>Salary</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.tuitionTitle}</td>
                    <td>{app.subject}</td>
                    <td>{app.location}</td>
                    <td className="font-semibold">{app.salary}</td>
                    <td>{app.appliedDate}</td>
                    <td>
                      <div className={`badge ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </div>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-sm">
                        <FiEye /> View
                      </button>
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

export default MyApplications;
