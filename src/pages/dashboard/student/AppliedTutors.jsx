import { FiCheck, FiX, FiEye } from "react-icons/fi";
import useAuth from "../../../hook/useAuth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { Link } from "react-router-dom";

const AppliedTutors = () => {
  const { user } = useAuth();
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applied-tutors"],
    queryFn: async () => {
      const res = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/applications?student_email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Applied Tutors</h1>

      <div className="grid grid-cols-1 gap-4">
        {applications.map((app) => (
          <div key={app.id} className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{app.tutor_name}</h3>
                  <p className="text-base-content/70 mb-2">
                    Applied for: {app.tuition_title}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span>
                      <strong>Experience:</strong> {app.experience}
                    </span>
                    <span>
                      <strong>Applied:</strong> {app.applied_at}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div
                    className={`badge ${
                      app.status === "accepted"
                        ? "badge-success"
                        : app.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {app.status}
                  </div>
                  {app.status === "pending" && (
                    <div className="flex gap-2">
                      <button className="btn btn-success btn-sm">
                        <FiCheck /> Accept
                      </button>
                      <button className="btn btn-error btn-sm">
                        <FiX /> Reject
                      </button>
                    </div>
                  )}
                  <Link to={`tutors/${app.tutor_id}`} className="btn btn-outline btn-sm">
                    <FiEye /> View Profile
                  </Link>
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
