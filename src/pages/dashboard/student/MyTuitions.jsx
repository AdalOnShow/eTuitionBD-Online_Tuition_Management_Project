import { Link } from "react-router-dom";
import { FiPlus, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import useAuth from "../../../hook/useAuth";
import Swal from "sweetalert2";
import EditTuitionModal from "../../../components/modals/EditTuitionModal";
import { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const MyTuitions = () => {
  const { user, loading } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTuition, setSelectedTuition] = useState(null);
  const axiosSecure = useAxiosSecure();

  const { data: tuitions, isLoading, refetch } = useQuery({
    queryKey: ["tuitions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/tuitions?email=${user?.email}`
      );
      const data = await res.json();
      return data.tuitions;
    },
  });

  const handleEditTuition = (tuition) => {
    setSelectedTuition(tuition);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTuition(null);
  };

  const handleDeletTuition = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axiosSecure.delete(`/tuition/${id}`);
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete tuition. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

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
                {tuitions && tuitions.length > 0 ? (
                  tuitions.map((tuition) => (
                  <tr key={tuition._id}>
                    <td>{tuition.title}</td>
                    <td>{tuition.subject}</td>
                    <td>
                      <div
                        className={`badge ${
                          tuition.status === "active"
                            ? "badge-success"
                            : tuition.status === "pending"
                            ? "badge-secondary"
                            : "badge-warning"
                        }`}
                      >
                        {tuition.status}
                      </div>
                    </td>
                    <td>{tuition.class}</td>
                    <td>
                      {new Date(tuition.created_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <Link
                          to={`/tuition/${tuition._id}`}
                          className="btn btn-ghost btn-sm"
                        >
                          <FiEye />
                        </Link>
                        <button
                          onClick={() => handleEditTuition(tuition)}
                          className="btn btn-ghost btn-sm"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDeletTuition(tuition._id)}
                          className="btn btn-ghost btn-sm text-error"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <div className="text-6xl mb-4">📚</div>
                      <h3 className="text-xl font-semibold mb-2">No Tuitions Posted Yet</h3>
                      <p className="text-base-content/70 mb-4">
                        You haven't posted any tuitions yet. Start by posting your first tuition!
                      </p>
                      <Link to="/dashboard/student/post-tuition" className="btn btn-primary">
                        Post Your First Tuition
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Tuition Modal */}
      <EditTuitionModal
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        tuitionData={selectedTuition}
        refetch={refetch}
      />
    </div>
  );
};

export default MyTuitions;
