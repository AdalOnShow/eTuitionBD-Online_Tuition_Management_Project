import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hook/useAuth";
import LoadingSpinner from "../shared/LoadingSpinner";
import useAxiosSecure from "./../../hook/useAxiosSecure";

const ApplyTuitionModal = ({ isOpen, closeModal, tuitionData }) => {
  const { user: currentUser, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", currentUser?.email],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user?email=${currentUser?.email}`
      );

      return response.data;
    },
    enabled: !!currentUser?.email,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      qualifications: "",
      experience: "",
      expectedSalary: "",
    },
  });

  useEffect(() => {
    reset({
      name: user?.name || currentUser?.displayName || "",
      email: user?.email || currentUser?.email || "",
      qualifications: "",
      experience: "",
      expectedSalary: "",
    });
  }, [user, currentUser, reset, isOpen]);

  if (loading || isLoading) return <LoadingSpinner />;

  const onSubmit = async (data) => {
    try {
      const applicationData = {
        tuition_id: tuitionData._id,
        tutor_email: user.email,
        tutor_id: user._id,
        tutor_name: user.name,
        tutor_photo: user.photo,
        qualifications: data.qualifications,
        experience: data.experience,
        expected_salary: parseFloat(data.expectedSalary),
        status: "pending",
        student_email: tuitionData.student_email,
        tuition_title: tuitionData.title,
        subject: tuitionData.subject,
      };

      await axiosSecure.post(`/apply-tuition`, applicationData);

      Swal.fire({
        icon: "success",
        title: "Application Submitted!",
        text: "Your application has been sent to the student. You will be notified once they review it.",
        showConfirmButton: false,
        timer: 2000,
      });

      reset();
      closeModal();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      Swal.fire({
        icon: "error",
        title: "Application Failed",
        text: errorMessage,
        showConfirmButton: true,
        timer:
          errorMessage.includes("already applied") ||
          errorMessage.includes("your own tuition")
            ? 4000
            : 2000,
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 bg-black opacity-50" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-2xl rounded-xl bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-gray-900 mb-4"
            >
              Apply for Tuition: {tuitionData?.title}
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Read-only fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered bg-gray-100"
                    {...register("name")}
                    readOnly
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered bg-gray-100"
                    {...register("email")}
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Qualifications */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Qualifications <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <textarea
                    placeholder="Describe your educational background and relevant qualifications..."
                    className="textarea textarea-bordered h-24"
                    {...register("qualifications", {
                      required: "Qualifications are required",
                      minLength: {
                        value: 10,
                        message: "Please provide at least 10 characters",
                      },
                      maxLength: {
                        value: 500,
                        message: "Qualifications cannot exceed 500 characters",
                      },
                    })}
                  />
                  {errors.qualifications && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.qualifications.message}
                    </p>
                  )}
                </div>

                {/* Experience */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Experience <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <textarea
                    placeholder="Describe your teaching experience, previous students, subjects taught..."
                    className="textarea textarea-bordered h-24"
                    {...register("experience", {
                      required: "Experience details are required",
                      minLength: {
                        value: 10,
                        message: "Please provide at least 10 characters",
                      },
                      maxLength: {
                        value: 500,
                        message: "Experience cannot exceed 500 characters",
                      },
                    })}
                  />
                  {errors.experience && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.experience.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Expected Salary */}
              <div className="form-control">
                <label className="label block">
                  <span className="label-text font-semibold">
                    Expected Salary (৳/month){" "}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="Enter your expected monthly salary"
                  className="input input-bordered"
                  {...register("expectedSalary", {
                    required: "Expected salary is required",
                    min: {
                      value: 1000,
                      message: "Minimum salary should be ৳1000",
                    },
                    max: {
                      value: 100000,
                      message: "Maximum salary should be ৳100,000",
                    },
                  })}
                />
                {errors.expectedSalary && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.expectedSalary.message}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex mt-6 gap-4 justify-end">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Application
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ApplyTuitionModal;
