import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hook/useAuth";
import { saveOrUpdateUser } from "../../utils";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      const { user } = await signIn(data.email, data.password);

      await saveOrUpdateUser({
        email: user?.email,
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
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        role: "student",
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
      });
    }
  };

  return (
    <div className="hero min-h-[80vh]">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className={`input input-bordered ${
                errors.email ? "input-error" : ""
              }`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-error text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className={`input input-bordered ${
                errors.password ? "input-error" : ""
              }`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-error text-sm mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>

          <div className="divider">OR</div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-outline"
          >
            Sign in with Google
          </button>

          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
