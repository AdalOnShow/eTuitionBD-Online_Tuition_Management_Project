import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [userType, setUserType] = useState("student");

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
                className={`btn flex-1 ${userType === "student" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setUserType("student")}
              >
                Register as Student
              </button>
              <button
                className={`btn flex-1 ${userType === "tutor" ? "btn-primary" : "btn-outline"}`}
                onClick={() => setUserType("tutor")}
              >
                Register as Tutor
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Full Name</span>
                  </label>
                  <input type="text" placeholder="Enter your name" className="input input-bordered" />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  <input type="email" placeholder="Enter your email" className="input input-bordered" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Password</span>
                  </label>
                  <input type="password" placeholder="Create password" className="input input-bordered" />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Confirm Password</span>
                  </label>
                  <input type="password" placeholder="Confirm password" className="input input-bordered" />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Phone Number</span>
                </label>
                <input type="tel" placeholder="Enter phone number" className="input input-bordered" />
              </div>

              {userType === "tutor" && (
                <>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Education</span>
                    </label>
                    <input type="text" placeholder="Your highest education" className="input input-bordered" />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Subject Specialization</span>
                    </label>
                    <input type="text" placeholder="e.g., Mathematics, Physics" className="input input-bordered" />
                  </div>
                </>
              )}

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" className="checkbox checkbox-sm" />
                  <span className="label-text">I agree to the Terms and Conditions</span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-block">Register</button>
            </form>

            <p className="text-center mt-6 text-sm">
              Already have an account? <Link to="/login" className="link link-primary font-semibold">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
