import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FiCheck, FiEye, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import useAuth from "../../../hook/useAuth";

const AppliedTutors = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applied-tutors"],
    queryFn: async () => {
      const res = await axios(
        `${import.meta.env.VITE_API_URL}/applications?student_email=${
          user.email
        }`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mutation for updating application status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ applicationId, status }) => {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/application-status/${applicationId}`,
        { status }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["applied-tutors"]);
    },
  });

  const handleAccept = async (applicationId, tutorName) => {
    const result = await Swal.fire({
      title: "Accept Application?",
      text: `Are you sure you want to accept ${tutorName}'s application?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Accept",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await updateStatusMutation.mutateAsync({
          applicationId,
          status: "accepted",
        });

        Swal.fire({
          title: "Accepted!",
          text: `${tutorName}'s application has been accepted.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error accepting application:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to accept application. Please try again.",
          icon: "error",
        });
      }
    }
  };

  const handleReject = async (applicationId, tutorName) => {
    const result = await Swal.fire({
      title: "Reject Application?",
      text: `Are you sure you want to reject ${tutorName}'s application?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await updateStatusMutation.mutateAsync({
          applicationId,
          status: "rejected",
        });

        Swal.fire({
          title: "Rejected!",
          text: `${tutorName}'s application has been rejected.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error rejecting application:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to reject application. Please try again.",
          icon: "error",
        });
      }
    }
  };

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
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleAccept(app._id, app.tutor_name)}
                        disabled={updateStatusMutation.isPending}
                      >
                        <FiCheck /> Accept
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleReject(app._id, app.tutor_name)}
                        disabled={updateStatusMutation.isPending}
                      >
                        <FiX /> Reject
                      </button>
                    </div>
                  )}
                  <Link
                    to={`/tutors/${app.tutor_id}`}
                    className="btn btn-outline btn-sm"
                  >
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
