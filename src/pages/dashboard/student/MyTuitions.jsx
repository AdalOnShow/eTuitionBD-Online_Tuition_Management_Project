import { Link } from "react-router-dom";
import { FiPlus, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const MyTuitions = () => {
  const tuitions = [
    {
      id: 1,
      title: "Need Math Tutor for Class 10",
      subject: "Mathematics",
      status: "Active",
      applicants: 12,
      postedDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Physics Teacher Required",
      subject: "Physics",
      status: "Closed",
      applicants: 8,
      postedDate: "2024-01-10"
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Tuitions</h1>
        <Link to="/dashboard/student/post-tuition" className="btn btn-primary">
          <FiPlus className="mr-2" /> Post New Tuition
        </Link>
      </div>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Applicants</th>
                  <th>Posted Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tuitions.map((tuition) => (
                  <tr key={tuition.id}>
                    <td>{tuition.title}</td>
                    <td>{tuition.subject}</td>
                    <td>
                      <div className={`badge ${tuition.status === 'Active' ? 'badge-success' : 'badge-error'}`}>
                        {tuition.status}
                      </div>
                    </td>
                    <td>{tuition.applicants}</td>
                    <td>{tuition.postedDate}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-ghost btn-sm">
                          <FiEye />
                        </button>
                        <button className="btn btn-ghost btn-sm">
                          <FiEdit />
                        </button>
                        <button className="btn btn-ghost btn-sm text-error">
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

export default MyTuitions;
