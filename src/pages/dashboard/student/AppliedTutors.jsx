import { FiCheck, FiX, FiEye } from "react-icons/fi";

const AppliedTutors = () => {
  const applications = [
    {
      id: 1,
      tutorName: "Dr. Ahmed Rahman",
      tuitionTitle: "Need Math Tutor for Class 10",
      appliedDate: "2024-01-16",
      status: "Pending",
      experience: "10 years",
      rating: 4.9
    },
    {
      id: 2,
      tutorName: "Fatima Khan",
      tuitionTitle: "Physics Teacher Required",
      appliedDate: "2024-01-14",
      status: "Accepted",
      experience: "7 years",
      rating: 4.8
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Applied Tutors</h1>

      <div className="grid grid-cols-1 gap-4">
        {applications.map((app) => (
          <div key={app.id} className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{app.tutorName}</h3>
                  <p className="text-base-content/70 mb-2">Applied for: {app.tuitionTitle}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span><strong>Experience:</strong> {app.experience}</span>
                    <span><strong>Rating:</strong> {app.rating}/5</span>
                    <span><strong>Applied:</strong> {app.appliedDate}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className={`badge ${app.status === 'Accepted' ? 'badge-success' : 'badge-warning'}`}>
                    {app.status}
                  </div>
                  {app.status === 'Pending' && (
                    <div className="flex gap-2">
                      <button className="btn btn-success btn-sm">
                        <FiCheck /> Accept
                      </button>
                      <button className="btn btn-error btn-sm">
                        <FiX /> Reject
                      </button>
                    </div>
                  )}
                  <button className="btn btn-outline btn-sm">
                    <FiEye /> View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedTutors;
