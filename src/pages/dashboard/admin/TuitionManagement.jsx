import { FiEye, FiEdit, FiTrash2, FiSearch, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useState } from "react";

const TuitionManagement = () => {
  const [statusFilter, setStatusFilter] = useState("all");

  const tuitions = [
    {
      id: 1,
      title: "Need Math Tutor for Class 10",
      student: "Karim Ahmed",
      subject: "Mathematics",
      class: "Class 10",
      salary: "৳8,000/month",
      status: "Active",
      applicants: 12,
      postedDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Physics Teacher Required",
      student: "Sara Khan",
      subject: "Physics",
      class: "O Level",
      salary: "৳12,000/month",
      status: "Closed",
      applicants: 8,
      postedDate: "2024-01-10"
    },
    {
      id: 3,
      title: "Chemistry Tutor Needed",
      student: "Rahim Uddin",
      subject: "Chemistry",
      class: "HSC",
      salary: "৳10,000/month",
      status: "Pending",
      applicants: 5,
      postedDate: "2024-01-20"
    }
  ];

  const filteredTuitions = statusFilter === "all" 
    ? tuitions 
    : tuitions.filter(t => t.status.toLowerCase() === statusFilter);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tuition Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Total Tuitions</div>
            <div className="stat-value text-primary">{tuitions.length}</div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Active</div>
            <div className="stat-value text-success">
              {tuitions.filter(t => t.status === 'Active').length}
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Pending</div>
            <div className="stat-value text-warning">
              {tuitions.filter(t => t.status === 'Pending').length}
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Closed</div>
            <div className="stat-value text-error">
              {tuitions.filter(t => t.status === 'Closed').length}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tuitions..."
                  className="input input-bordered w-full pr-10"
                />
                <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50" />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className={`btn btn-sm ${statusFilter === 'all' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setStatusFilter('all')}
              >
                All
              </button>
              <button
                className={`btn btn-sm ${statusFilter === 'active' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setStatusFilter('active')}
              >
                Active
              </button>
              <button
                className={`btn btn-sm ${statusFilter === 'pending' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setStatusFilter('pending')}
              >
                Pending
              </button>
              <button
                className={`btn btn-sm ${statusFilter === 'closed' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setStatusFilter('closed')}
              >
                Closed
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Class</th>
                  <th>Salary</th>
                  <th>Status</th>
                  <th>Applicants</th>
                  <th>Posted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTuitions.map((tuition) => (
                  <tr key={tuition.id}>
                    <td className="font-semibold">{tuition.title}</td>
                    <td>{tuition.student}</td>
                    <td>{tuition.subject}</td>
                    <td>{tuition.class}</td>
                    <td className="font-semibold">{tuition.salary}</td>
                    <td>
                      <div className={`badge ${
                        tuition.status === 'Active' ? 'badge-success' :
                        tuition.status === 'Pending' ? 'badge-warning' :
                        'badge-error'
                      }`}>
                        {tuition.status}
                      </div>
                    </td>
                    <td>{tuition.applicants}</td>
                    <td>{tuition.postedDate}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-ghost btn-sm" title="View">
                          <FiEye />
                        </button>
                        <button className="btn btn-ghost btn-sm text-success" title="Approve">
                          <FiCheckCircle />
                        </button>
                        <button className="btn btn-ghost btn-sm text-error" title="Reject">
                          <FiXCircle />
                        </button>
                        <button className="btn btn-ghost btn-sm text-error" title="Delete">
                          <FiTrash2 />
                        </button>
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

export default TuitionManagement;
