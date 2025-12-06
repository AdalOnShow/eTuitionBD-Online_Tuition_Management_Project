import { Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-base-content/70">Login to your eTuitionBD account</p>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input type="email" placeholder="Enter your email" className="input input-bordered w-full" />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <input type="password" placeholder="Enter your password" className="input input-bordered w-full" />
              </div>

              <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>

            <p className="text-center mt-6 text-sm">
              Don't have an account? <Link to="/register" className="link link-primary font-semibold">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
