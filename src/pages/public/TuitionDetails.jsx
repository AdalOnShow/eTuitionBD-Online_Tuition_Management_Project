import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  FiBook,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiUser,
} from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import ApplyTuitionModal from "../../components/modals/ApplyTuitionModal";
import useRole from "../../hook/useRole";
import useAuth from "../../hook/useAuth";

// Loading Skeleton Component
const TuitionDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-11/12 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                {/* Title and Badge Skeleton */}
                <div className="flex justify-between items-start mb-4">
                  <div className="skeleton h-8 w-3/4"></div>
                  <div className="skeleton h-6 w-20"></div>
                </div>

                {/* Details Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="skeleton h-4 w-4 rounded-full"></div>
                      <div className="skeleton h-4 w-32"></div>
                    </div>
                  ))}
                </div>

                <div className="divider"></div>

                {/* Description Skeleton */}
                <div className="mb-6">
                  <div className="skeleton h-6 w-32 mb-3"></div>
                  <div className="space-y-2">
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-lg sticky top-20">
              <div className="card-body">
                {/* Apply Section Skeleton */}
                <div className="skeleton h-6 w-48 mb-4"></div>
                <div className="space-y-4">
                  <div className="skeleton h-12 w-full"></div>
                  <div className="skeleton h-10 w-full"></div>
                </div>
                
                <div className="divider"></div>

                {/* Info Section Skeleton */}
                <div className="space-y-3">
                  <div>
                    <div className="skeleton h-3 w-16 mb-1"></div>
                    <div className="skeleton h-4 w-32"></div>
                  </div>
                  <div>
                    <div className="skeleton h-3 w-12 mb-1"></div>
                    <div className="skeleton h-5 w-20"></div>
                  </div>
                </div>

                <div className="divider"></div>

                {/* Contact Section Skeleton */}
                <div>
                  <div className="skeleton h-5 w-40 mb-2"></div>
                  <div className="space-y-2">
                    <div className="skeleton h-3 w-full"></div>
                    <div className="skeleton h-3 w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="skeleton h-10 w-40"></div>
        </div>
      </div>
    </div>
  );
};

const TuitionDetails = () => {
  const { id } = useParams();
  const { role, isRoleLoading } = useRole();
  const { user } = useAuth();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const {
    data: tuition,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/tuition/${id}`
      );

      return data;
    },
  });

  // Check if current user has already applied to this tuition
  const { data: existingApplication, isLoading: isApplicationLoading } =
    useQuery({
      queryKey: ["application-check", id, user?.email],
      queryFn: async () => {
        if (!user?.email || role !== "tutor") return null;

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/applications?tutor_email=${
            user.email
          }`
        );

        // Find application for this specific tuition
        return data.find((app) => app.tuition_id === id) || null;
      },
      enabled: !!user?.email && role === "tutor",
    });

  if (isLoading || isRoleLoading || isApplicationLoading)
    return <TuitionDetailsSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-error mb-2">
            Error Loading Tuition
          </h2>
          <p className="text-base-content/70">{error.message}</p>
          <Link to="/tuitions" className="btn btn-primary mt-4">
            Back to All Tuitions
          </Link>
        </div>
      </div>
    );
  }

  if (!tuition) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Tuition Not Found</h2>
          <Link to="/tuitions" className="btn btn-primary mt-4">
            Back to All Tuitions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-11/12 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold">{tuition.title}</h1>
                  <div className="badge badge-primary badge-lg">
                    {tuition.tuition_type}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <FiBook className="text-primary" />
                    <span>
                      <strong>Subject:</strong> {tuition.subject}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUser className="text-primary" />
                    <span>
                      <strong>Class:</strong> {tuition.class}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-primary" />
                    <span>{tuition.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiDollarSign className="text-success" />
                    <span className="text-success font-bold">
                      ৳{tuition.budget}/month
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-primary" />
                    <span>{tuition.days_per_week} days/week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="text-primary" />
                    <span>{tuition.duration} hours per session</span>
                  </div>
                </div>

                <div className="divider"></div>

                {tuition.description && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-3">Description</h2>
                    <p className="text-base-content/80">
                      {tuition.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-lg sticky top-20">
              <div className="card-body">
                {role === "tutor" && user && (
                  <>
                    <h2 className="card-title mb-4">Apply for this Tuition</h2>
                    <div className="space-y-4">
                      {/* Check if user is the tuition owner (self-apply prevention) */}
                      {user.email === tuition.student_email ? (
                        <div className="alert alert-info">
                          <span>This is your own tuition posting</span>
                        </div>
                      ) : existingApplication ? (
                        /* Check if user already applied (duplicate prevention) */
                        <div className="space-y-2">
                          <div className="alert alert-success">
                            <span>
                              You have already applied to this tuition
                            </span>
                          </div>
                          <div
                            className={`badge ${
                              existingApplication.status === "pending"
                                ? "badge-warning"
                                : existingApplication.status === "accepted"
                                ? "badge-success"
                                : "badge-error"
                            }`}
                          >
                            Status: {existingApplication.status}
                          </div>
                        </div>
                      ) : (
                        /* Show apply button only if user can apply */
                        <>
                          <button
                            className="btn btn-primary btn-block btn-lg"
                            onClick={() => setIsApplyModalOpen(true)}
                          >
                            Apply Now
                          </button>
                          <button className="btn btn-outline btn-block">
                            Save for Later
                          </button>
                        </>
                      )}
                    </div>
                    <div className="divider"></div>
                  </>
                )}

                <div className="space-y-3">
                  {tuition.created_at && (
                    <div>
                      <p className="text-sm text-base-content/70">Posted</p>
                      <p className="font-semibold">
                        {new Date(tuition.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-base-content/70">Status</p>
                    <div
                      className={`badge ${
                        tuition.status === "pending"
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                    >
                      {tuition.status}
                    </div>
                  </div>
                </div>

                <div className="divider"></div>

                <div>
                  <h3 className="font-bold mb-2">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Email:</strong> {tuition.student_email}
                    </p>
                    <p>
                      <strong>Location:</strong> {tuition.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link to="/tuitions" className="btn btn-ghost">
            ← Back to All Tuitions
          </Link>
        </div>
      </div>

      {/* Apply Tuition Modal */}
      {tuition && (
        <ApplyTuitionModal
          isOpen={isApplyModalOpen}
          closeModal={() => setIsApplyModalOpen(false)}
          tuitionData={tuition}
        />
      )}
    </div>
  );
};

export default TuitionDetails;
