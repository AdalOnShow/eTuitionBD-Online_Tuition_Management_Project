import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SubjectMultiSelect from "../../components/form/SubjectMultiSelect";
import FileInput from "../../components/form/FileInput";
import { imageUpload, saveOrUpdateUser } from "../../utils";
import useAuth from "../../hook/useAuth";

const Register = () => {
  const [userType, setUserType] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, phone, education, subjects, photo } = data;

    setIsLoading(true);
    try {
      const imageUrl = await imageUpload(photo);

      const newUser = {
        photo: imageUrl,
        name,
        email,
        phone,
        role: userType,
        status: "active",
      };

      if (userType === "tutor") {
        newUser.subjects = subjects;
        newUser.education = education;
      }

      await createUser(email, password);
      await saveOrUpdateUser(newUser);
      await updateUserProfile(name, imageUrl);

      Swal.fire({
        icon: "success",
        title: "Register successful!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Register failed",
        text: error.message,
      });
    } finally {
      setIsLoading(false);
      navigate(from, { replace: true });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        role: "student",
        status: "active",
      });

      Swal.fire({
        icon: "success",
        title: "Login successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-base-content/70">Join eTuitionBD today</p>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex gap-4 mb-6">
              <button
                className={`btn flex-1 ${
                  userType === "student" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setUserType("student")}
              >
                Register as Student
              </button>
              <button
                className={`btn flex-1 ${
                  userType === "tutor" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setUserType("tutor")}
              >
                Register as Tutor
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate=""
              action=""
              className="space-y-4"
            >
              <div className="form-control">
                <Controller
                  name="photo"
                  control={control}
                  rules={{
                    required: "Profile photo is required",
                  }}
                  render={({ field }) => (
                    <FileInput onChange={field.onChange} error={errors.photo} />
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="input input-bordered"
                    {...register("name", {
                      required: "Name is required",
                      maxLength: {
                        value: 20,
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
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address.",
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
                    <span className="label-text font-semibold">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      className="input input-bordered w-full pr-12"
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                          message:
                            "Password must be 6+ chars and include uppercase, lowercase, number, and special character",
                        },
                      })}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
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
              </div>

              {userType === "tutor" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Education Field */}
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
                        required: "Education is required",
                        maxLength: {
                          value: 60,
                          message: "Education content cannot be too long",
                        },
                      })}
                    />
                    {errors.education && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.education.message}
                      </p>
                    )}
                  </div>

                  {/* Subject Multi Select */}
                  <div className="form-control">
                    <Controller
                      name="subjects"
                      control={control}
                      rules={{
                        required: "At least one subject is required",
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
                </div>
              )}

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" className="checkbox checkbox-sm" />
                  <span className="label-text">
                    I agree to the Terms and Conditions
                  </span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating Account...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </form>

            <div className="divider">OR</div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline"
            >
              Sign in with Google
            </button>

            <p className="text-center mt-6 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-semibold">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
