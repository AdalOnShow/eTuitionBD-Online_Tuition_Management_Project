const ProfileSettings = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body items-center text-center">
              <div className="avatar mb-4">
                <div className="w-32 h-32 rounded-full bg-primary text-primary-content flex items-center justify-center text-5xl font-bold">
                  S
                </div>
              </div>
              <h2 className="text-2xl font-bold">Student Name</h2>
              <p className="text-base-content/70">student@email.com</p>
              <button className="btn btn-primary btn-sm mt-4">Change Photo</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title mb-4">Personal Information</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Full Name</span>
                    </label>
                    <input type="text" defaultValue="Student Name" className="input input-bordered" />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Email</span>
                    </label>
                    <input type="email" defaultValue="student@email.com" className="input input-bordered" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Phone</span>
                    </label>
                    <input type="tel" defaultValue="+880 1234-567890" className="input input-bordered" />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Gender</span>
                    </label>
                    <select className="select select-bordered">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Address</span>
                  </label>
                  <textarea className="textarea textarea-bordered" defaultValue="Dhanmondi, Dhaka"></textarea>
                </div>

                <div className="divider"></div>

                <h3 className="font-bold text-lg">Change Password</h3>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Current Password</span>
                  </label>
                  <input type="password" className="input input-bordered" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">New Password</span>
                    </label>
                    <input type="password" className="input input-bordered" />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Confirm Password</span>
                    </label>
                    <input type="password" className="input input-bordered" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                  <button type="button" className="btn btn-ghost">Cancel</button>
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
