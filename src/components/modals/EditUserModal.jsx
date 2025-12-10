import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import SubjectMultiSelect from "../form/SubjectMultiSelect";

const EditUserModal = ({ isOpen, closeModal, userData, refetch }) => {
  const [originalRole, setOriginalRole] = useState(userData?.role);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      role: userData?.role || "student",
      name: userData?.name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      address: userData?.address || "",
      photo: userData?.photo || "",
      education: userData?.education || "",
      subjects: userData?.subjects || [],
    },
  });

  const watchedRole = watch("role");

  // Reset form when userData changes
  useEffect(() => {
    if (userData) {
      setOriginalRole(userData.role);
      reset({
        role: userData.role || "student",
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        photo: userData.photo || "",
        education: userData.education || "",
        subjects: userData.subjects || [],
      });
    }
  }, [userData, reset]);

  const handleRoleChange = async (newRole) => {
    // If changing from tutor to non-tutor, show confirmation
    if (originalRole === "tutor" && newRole !== "tutor") {
      const result = await Swal.fire({
        title: "Confirm Role Change",
        text: "Changing role from tutor will remove education and subjects data. Continue?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, continue",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) {
        // Revert role selection
        setValue("role", originalRole);
        return;
      }
    }

    // If changing to non-tutor, clear education and subjects
    if (newRole !== "tutor") {
      setValue("education", "");
      setValue("subjects", []);
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${userData.email}`,
        data
      );

      Swal.fire({
        icon: "success",
        title: "User updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      refetch();
      closeModal();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to update user",
        text: err.response?.data?.message || err.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
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
                Edit User Information
              </DialogTitle>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Role Selection */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Role</span>
                  </label>
                  <select
                    {...register("role", { required: "Role is required" })}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                  {errors.role && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      className="input input-bordered"
                      {...register("name", {
                        required: "Name is required",
                        maxLength: {
                          value: 50,
                          message: "Name cannot exceed 50 characters",
                        },
                      })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      className="input input-bordered"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Phone Number
                      </span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      className="input input-bordered"
                      {...register("phone")}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Address</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter address"
                      className="input input-bordered"
                      {...register("address", {
                        minLength: {
                          value: 3,
                          message: "Address must be at least 3 characters long",
                        },
                      })}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Profile Photo URL
                    </span>
                  </label>
                  <input
                    type="url"
                    placeholder="Enter profile photo URL"
                    className="input input-bordered"
                    {...register("photo")}
                  />
                </div>

                {/* Tutor-specific fields */}
                {watchedRole === "tutor" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Education
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your highest education"
                        className="input input-bordered"
                        {...register("education", {
                          maxLength: {
                            value: 40,
                            message: "Education cannot exceed 40 characters",
                          },
                        })}
                      />
                      {errors.education && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.education.message}
                        </p>
                      )}
                    </div>

                    <div className="form-control">
                      <Controller
                        name="subjects"
                        control={control}
                        render={({ field }) => (
                          <SubjectMultiSelect
                            value={field.value || []}
                            onChange={field.onChange}
                            error={errors.subjects}
                          />
                        )}
                      />
                    </div>
                  </div>
                )}

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
                    Update User
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default EditUserModal;
