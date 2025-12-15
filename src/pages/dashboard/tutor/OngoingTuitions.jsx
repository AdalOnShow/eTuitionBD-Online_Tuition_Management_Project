import { FiUser, FiMapPin, FiPhone } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./../../../hook/useAuth";
import LoadingSpinner from "./../../../components/shared/LoadingSpinner";

const OngoingTuitions = () => {
  const { user, loading } = useAuth();
  const { data: appliedTuitions, isLoading } = useQuery({
    queryKey: ["appliedTuitions", user?.email],
    queryFn: async () => {
      const res = await axios(
        `${import.meta.env.VITE_API_URL}/applications?tutor_email=${user?.email}`
      );
      return res.data;
    },
    enabled: !loading && !!user?.email,
  });

  const tuitions =
    appliedTuitions?.filter((tuition) => tuition.status === "accepted") || [];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Ongoing Tuitions</h1>

      <div className="grid grid-cols-1 gap-6">
        {tuitions.map((tuition) => (
          <div key={tuition._id} className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                        {tuition.student_email.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">
                        {tuition.tuition_title}
                      </h3>
                      <p className="text-base-content/70">
                        {tuition.subject} - {tuition.class}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-primary" />
                      <span className="text-sm">{tuition.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiPhone className="text-primary" />
                      <span className="text-sm">{tuition.phone}</span>
                    </div>
                    <div>
                      <p className="text-sm">
                        <strong>Schedule:</strong> {tuition.schedule}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">
                        <strong>Started:</strong> {tuition.startDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:items-end">
                  <div className="text-2xl font-bold text-success">
                    {tuition.expected_salary}
                  </div>
                  <button className="btn btn-primary btn-sm">
                    Contact Student
                  </button>
                  <button className="btn btn-outline btn-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tuitions.length === 0 && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body text-center py-12">
            <p className="text-base-content/70">
              No ongoing tuitions at the moment
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OngoingTuitions;
