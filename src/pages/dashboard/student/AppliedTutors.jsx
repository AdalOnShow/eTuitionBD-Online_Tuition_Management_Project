import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FiCheck, FiEye, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import useAuth from "../../../hook/useAuth";
import { useState } from "react";
import AcceptTuitionsModal from "../../../components/modals/AcceptTuitionsModal";

const AppliedTutors = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

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

  const handleAccept = (application) => {
    setSelectedApplication(application);
    setIsAcceptModalOpen(true);
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
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Applied Tutors</h1>
        <p className="text-base-content/70">
          Review and manage tutor applications for your posted tuitions
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
          <p className="text-base-content/70 mb-4">
            You haven't received any tutor applications yet. Make sure your tuition posts are active!
          </p>
          <Link to="/dashboard/student/my-tuitions" className="btn btn-primary">
            View My Tuitions
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {applications.map((app) => (
            <div key={app._id} className="card bg-base-100 shadow-lg border">
              <div className="card-body p-6">
                {/* Header with Status */}
                <div className="flex justify-between items-start mb-4">
                  <div className="text-sm text-base-content/60">
                    Applied for: <span className="font-medium">{app.tuition_title}</span>
                  </div>
                  <div
                    className={`badge badge-lg ${
                      app.status === "accepted"
                        ? "badge-success"
                        : app.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {app.status.toUpperCase()}
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Section - Profile & Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      {/* Profile Picture */}
                      <div className="avatar">
                        <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img
                            src={app?.tutor_photo}
                            alt={app.tutor_name}
                            className="rounded-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Name & Basic Info */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-primary mb-1">
                          {app.tutor_name}
                        </h3>
                        <p className="text-base-content/70 text-sm mb-2">
                          Applied on: {new Date(app.applied_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Qualifications */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-base mb-2 flex items-center">
                        🎓 Qualifications
                      </h4>
                      <div className="bg-base-200 rounded-lg p-3">
                        <p className="text-sm">
                          {app.qualifications || "Not specified"}
                        </p>
                      </div>
                    </div>

                    {/* Experience & Salary Row */}
                      {/* Experience */}
                      <div>
                        <h4 className="font-semibold text-base mb-2 flex items-center">
                          💼 Experience
                        </h4>
                        <div className="bg-base-200 rounded-lg p-3">
                          <p className="text-sm font-medium">
                            {app.experience || "Not specified"}
                          </p>
                        </div>
                      </div>

                      {/* Expected Salary */}
                      <div>
                        <h4 className="font-semibold text-base mb-2 flex items-center">
                          💰 Expected Salary
                        </h4>
                        <div className="bg-base-200 rounded-lg p-3">
                          <p className="text-sm font-medium text-success">
                            ৳{app.expected_salary}
                          </p>
                        </div>
                      </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="lg:w-48 flex flex-col gap-3">
                    {/* View Profile Button */}
                    <Link
                      to={`/tutors/${app.tutor_id}`}
                      className="btn btn-outline btn-sm"
                    >
                      <FiEye className="w-4 h-4" />
                      View Full Profile
                    </Link>

                    {/* Action Buttons for Pending Applications */}
                    {app.status === "pending" && (
                      <>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleAccept(app)}
                          disabled={updateStatusMutation.isPending}
                        >
                          <FiCheck className="w-4 h-4" />
                          Accept Application
                        </button>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => handleReject(app._id, app.tutor_name)}
                          disabled={updateStatusMutation.isPending}
                        >
                          <FiX className="w-4 h-4" />
                          Reject Application
                        </button>
                      </>
                    )}

                    {/* Status Messages for Accepted/Rejected */}
                    {app.status === "accepted" && (
                      <div className="alert alert-success text-xs p-2">
                        ✅ Application Accepted
                      </div>
                    )}
                    {app.status === "rejected" && (
                      <div className="alert alert-error text-xs p-2">
                        ❌ Application Rejected
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Accept Modal */}
      {selectedApplication && (
        <AcceptTuitionsModal
          isOpen={isAcceptModalOpen}
          closeModal={() => {
            setIsAcceptModalOpen(false);
            setSelectedApplication(null);
          }}
          applicationData={selectedApplication}
        />
      )}
    </div>
  );
};

export default AppliedTutors;