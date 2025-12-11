import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../hook/useAuth";
import SubjectMultiSelect from "../../components/form/SubjectMultiSelect";
import FileInput from "../../components/form/FileInput";
import { imageUpload } from "../../utils";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const ProfileSettings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch user data
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users?email=${user?.email}`
      );
      return response.data[0];
    },
    enabled: !!user?.email,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    values: userData || {},
  });

  const updateUserMutation = useMutation({
    mutationFn: async (updateData) => {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${user?.email}`,
        updateData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", user?.email]);
      Swal.fire({
        icon: "success",
        title: "Profile updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsUpdating(false);
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error.message,
      });
      setIsUpdating(false);
    },
  });

  const onSubmit = async (data) => {
    setIsUpdating(true);

    try {
      const {
        address,
        created_at,
        education,
        email,
        gender,
        name,
        phone,
        subjects,
        updated_at,
        last_loggedIn,
        hourly_rate,
        bio,
      } = data;
      const updateData = {
        address,
        created_at,
        education,
        email,
        gender,
        name,
        phone,
        subjects,
        updated_at,
        last_loggedIn,
        hourly_rate,
        bio,
      };

      if (data.photo && data.photo !== userData.photo) {
        const imageUrl = await imageUpload(data.photo);
        updateData.photo = imageUrl;
      } else {
        updateData.photo = userData.photo;
      }

      updateUserMutation.mutate(updateData);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error.message,
      });
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    reset(userData);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body items-center text-center">
              <div className="avatar mb-4">
                {userData?.photo ? (
                  <div className="w-32 h-32 rounded-full">
                    <img src={userData.photo} alt={userData.name} />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-primary text-primary-content flex items-center justify-center text-5xl font-bold">
                    {userData?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold">{userData?.name || "User"}</h2>
              <p className="text-base-content/70">{userData?.email}</p>
              <div className="badge badge-primary mt-2 capitalize">
                {userData?.role || "User"}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title mb-4">Personal Information</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-control">
                  <Controller
                    name="photo"
                    control={control}
                    render={({ field }) => (
                      <FileInput
                        onChange={field.onChange}
                        error={errors.photo}
                        label="Change Profile Photo"
                      />
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label block">
                      <span className="label-text font-semibold">
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered"
                      {...register("name", {
                        required: "Name is required",
                        maxLength: {
                          value: 50,
                          message: "Name cannot be too long",
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
                    <label className="label block">
                      <span className="label-text font-semibold">Email</span>
                    </label>
                    <input
                      type="email"
                      className="input input-bordered bg-base-200"
                      {...register("email")}
                      disabled
                    />
                    <label className="label">
                      <span className="label-text-alt">
                        Email cannot be changed
                      </span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label block">
                      <span className="label-text font-semibold">Phone</span>
                    </label>
                    <input
                      type="tel"
                      className="input input-bordered"
                      {...register("phone")}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Gender</span>
                    </label>
                    <select
                      className="select select-bordered"
                      {...register("gender")}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label block">
                      <span className="label-text font-semibold">Address</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered"
                      {...register("address")}
                      placeholder="Enter your address"
                    />
                  </div>

                  {userData?.role === "tutor" && (
                    <>
                      <div className="form-control">
                        <label className="label block">
                          <span className="label-text font-semibold">
                            Hourly Rate (৳)
                          </span>
                        </label>
                        <input
                          type="number"
                          className="input input-bordered"
                          {...register("hourly_rate", {
                            required:
                              userData?.role === "tutor"
                                ? "Hourly Rate is required for tutors"
                                : false,
                            min: {
                              value: 1,
                              message: "Hourly rate must be at least ৳1",
                            },
                            max: {
                              value: 1000,
                              message: "Hourly rate cannot exceed ৳1,000",
                            },
                          })}
                          placeholder="Enter your hourly rate"
                        />
                        {errors.hourly_rate && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.hourly_rate.message}
                          </p>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label block">
                          <span className="label-text font-semibold">
                            Education
                          </span>
                        </label>
                        <input
                          type="text"
                          className="input input-bordered"
                          {...register("education", {
                            required:
                              userData?.role === "tutor"
                                ? "Education is required for tutors"
                                : false,
                            maxLength: {
                              value: 100,
                              message: "Education cannot be too long",
                            },
                          })}
                          placeholder="Your highest education"
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
                          rules={{
                            required:
                              userData?.role === "tutor"
                                ? "At least one subject is required for tutors"
                                : false,
                          }}
                          render={({ field }) => (
                            <SubjectMultiSelect
                              value={field.value || []}
                              onChange={field.onChange}
                              error={errors.subjects}
                            />
                          )}
                        />
                      </div>

                      <div className="form-control">
                        <label className="label block">
                          <span className="label-text font-semibold">
                            About Me
                          </span>
                        </label>
                        <textarea
                          className="textarea textarea-bordered h-24"
                          {...register("bio", {
                            maxLength: {
                              value: 500,
                              message: "Bio cannot exceed 500 characters",
                            },
                          })}
                          placeholder="Tell students about your teaching experience, approach, and what makes you a great tutor..."
                        />
                        {errors.bio && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.bio.message}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Updating...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={handleCancel}
                    disabled={isUpdating}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
