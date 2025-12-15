import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiEye, FiClock } from "react-icons/fi";
import useAuth from "../../../hook/useAuth";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { Link } from "react-router-dom";

const MyApplications = () => {
  const { user } = useAuth();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["tutor-applications"],
    queryFn: async () => {
      const res = await axios(
        `${import.meta.env.VITE_API_URL}/applications?tutor_email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });


  if (isLoading) return <LoadingSpinner />;

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
              {applications.filter((a) => a.status === "accepted").length}
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Pending</div>
            <div className="stat-value text-warning">
              {applications.filter((a) => a.status === "pending").length}
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
                {applications && applications.length > 0 ? (
                  applications.map((app) => (
                  <tr key={app._id}>
                    <td>{app.tuition_title}</td>
                    <td>{app.subject}</td>
                    <td>{app.location}</td>
                    <td className="font-semibold">{app.expected_salary}</td>
                    <td>{new Date(app.applied_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}</td>
                    <td>
                      <div className={`badge ${app.status === 'accepted' ? 'badge-success' : app.status === 'pending' ? 'badge-warning' : 'badge-error'}`}>
                        {app.status}
                      </div>
                    </td>
                    <td>
                      <Link to={`/tuition/${app.tuition_id}`} className="btn btn-ghost btn-sm">
                        <FiEye /> View
                      </Link>
                    </td>
                  </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-12">
                      <div className="text-6xl mb-4">📝</div>
                      <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
                      <p className="text-base-content/70 mb-4">
                        You haven't applied to any tuitions yet. Browse available tuitions and start applying!
                      </p>
                      <Link to="/tuitions" className="btn btn-primary">
                        Browse Tuitions
                      </Link>
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

export default MyApplications;
