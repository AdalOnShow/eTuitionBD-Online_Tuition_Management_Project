import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { subjectOptions } from "../../data/subjectOptions";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";

const EditTuitionModal = ({ isOpen, closeModal, tuitionData, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Pre-fill form when tuitionData changes
  useEffect(() => {
    if (tuitionData) {
      reset({
        title: tuitionData.title,
        subject: tuitionData.subject,
        classLevel: tuitionData.class,
        salary: tuitionData.budget,
        tuitionType: tuitionData.tuition_type,
        location: tuitionData.location,
        daysPerWeek: tuitionData.days_per_week,
        duration: tuitionData.duration,
        description: tuitionData.description || "",
      });
    }
  }, [tuitionData, reset]);

  const onSubmit = async (data) => {
    const {
      classLevel,
      daysPerWeek,
      description,
      duration,
      location,
      salary,
      subject,
      title,
      tuitionType,
    } = data;

    const updatedTuition = {
      title,
      tuition_type: tuitionType,
      subject,
      class: classLevel,
      location,
      budget: salary,
      days_per_week: daysPerWeek,
      description,
      duration,
    };

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/tuition/${tuitionData._id}`,
        updatedTuition
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Tuition updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      refetch();
      closeModal();
    } catch (error) {
      console.error("Error updating tuition:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update tuition. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-999 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 bg-black opacity-50" />
      <div className="fixed inset-0 z-999 w-screen overflow-y-auto pl-20">
        <div className="flex min-h-full items-end justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-4xl rounded-xl bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl max-h-[88vh] overflow-y-auto z-999"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-gray-900 mb-4"
            >
              Edit Tuition
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label block">
                    <span className="label-text font-semibold">
                      Tuition Title
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Need Math Tutor for Class 10"
                    className="input input-bordered"
                    {...register("title", {
                      required: "Tuition title is required",
                      minLength: {
                        value: 10,
                        message: "Title must be at least 10 characters long",
                      },
                    })}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label block">
                    <span className="label-text font-semibold">Subject</span>
                  </label>
                  <select
                    className="select select-bordered"
                    {...register("subject", {
                      required: "Please select a subject",
                      validate: (value) =>
                        value !== "Select Subject" || "Please select a subject",
                    })}
                  >
                    <option>Select Subject</option>
                    {subjectOptions.map((subject) => (
                      <option key={subject.value} value={subject.value}>
                        {subject.label}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label block">
                    <span className="label-text font-semibold">
                      Class/Level
                    </span>
                  </label>
                  <select
                    className="select select-bordered"
                    {...register("classLevel", {
                      required: "Please select a class/level",
                      validate: (value) =>
                        value !== "Select Class" ||
                        "Please select a class/level",
                    })}
                  >
                    <option>Select Class</option>
                    <option>Class 6</option>
                    <option>Class 7</option>
                    <option>Class 8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                    <option>HSC</option>
                    <option>O Level</option>
                    <option>A Level</option>
                  </select>
                  {errors.classLevel && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.classLevel.message}
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label block">
                    <span className="label-text font-semibold">
                      Salary (Monthly)
                    </span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 8000"
                    className="input input-bordered"
                    {...register("salary", {
                      required: "Salary is required",
                      min: {
                        value: 1000,
                        message: "Salary must be at least 1000 BDT",
                      },
                      max: {
                        value: 100000,
                        message: "Salary cannot exceed 100000 BDT",
                      },
                    })}
                  />
                  {errors.salary && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.salary.message}
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label block">
                    <span className="label-text font-semibold">
                      Tuition Type
                    </span>
                  </label>
                  <select
                    className="select select-bordered"
                    {...register("tuitionType", {
                      required: "Please select tuition type",
                    })}
                  >
                    <option>Home Tutoring</option>
                    <option>Online</option>
                    <option>Both</option>
                  </select>
                  {errors.tuitionType && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.tuitionType.message}
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label block">
                    <span className="label-text font-semibold">Location</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Dhanmondi, Dhaka"
                    className="input input-bordered"
                    {...register("location", {
                      required: "Location is required",
                      minLength: {
                        value: 3,
                        message: "Location must be at least 3 characters long",
                      },
                    })}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label block">
                    <span className="label-text font-semibold">
                      Days per Week
                    </span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 4"
                    className="input input-bordered"
                    {...register("daysPerWeek", {
                      required: "Days per week is required",
                      min: {
                        value: 1,
                        message: "Must be at least 1 day per week",
                      },
                      max: {
                        value: 7,
                        message: "Cannot exceed 7 days per week",
                      },
                    })}
                  />
                  {errors.daysPerWeek && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.daysPerWeek.message}
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label block">
                    <span className="label-text font-semibold">
                      Duration per Session (hours)
                    </span>
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="e.g., 1.5"
                    className="input input-bordered"
                    {...register("duration", {
                      required: "Duration per session is required",
                      min: {
                        value: 0.5,
                        message: "Duration must be at least 0.5 hours",
                      },
                      max: {
                        value: 5,
                        message: "Duration cannot exceed 5 hours",
                      },
                    })}
                  />
                  {errors.duration && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.duration.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="form-control">
                <label className="label block">
                  <span className="label-text font-semibold">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-12"
                  placeholder="Describe your requirements..."
                  {...register("description", {
                    minLength: {
                      value: 10,
                      message:
                        "Description must be at least 10 characters long",
                    },
                  })}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Tuition
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default EditTuitionModal;
