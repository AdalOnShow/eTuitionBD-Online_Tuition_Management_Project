import { Link } from "react-router-dom";
import { FiPlus, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import useAuth from "../../../hook/useAuth";

const MyTuitions = () => {
  const { user, loading } = useAuth();

  const { data: tuitions, isLoading } = useQuery({
    queryKey: ["tuitions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tuitions?email=${user?.email}`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading || loading) return <LoadingSpinner />;

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
                  <tr key={tuition._id}>
                    <td>{tuition.title}</td>
                    <td>{tuition.subject}</td>
                    <td>
                      <div
                        className={`badge ${
                          tuition.status === "pctive" ? "badge-success" : tuition.status === "pending" ? "badge-warning" : "badge-secondary"
                        }`}
                      >
                        {tuition.status}
                      </div>
                    </td>
                    <td>{tuition.class}</td>
                    <td>{new Date(tuition.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}</td>
                    <td>
                      <div className="flex gap-2">
                        <Link to={`/tuition/${tuition._id}`} className="btn btn-ghost btn-sm">
                          <FiEye />
                        </Link>
                        <Link to={`/dashboard/student/edit-tuition/${tuition._id}`} className="btn btn-ghost btn-sm">
                          <FiEdit />
                        </Link>
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
