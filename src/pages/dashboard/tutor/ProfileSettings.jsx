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
                  T
                </div>
              </div>
              <h2 className="text-2xl font-bold">Tutor Name</h2>
              <p className="text-base-content/70">tutor@email.com</p>
              <div className="badge badge-primary mt-2">Verified Tutor</div>
              <button className="btn btn-primary btn-sm mt-4">Change Photo</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title mb-4">Personal Information</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Full Name</span>
                    </label>
                    <input type="text" defaultValue="Tutor Name" className="input input-bordered" />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Email</span>
                    </label>
                    <input type="email" defaultValue="tutor@email.com" className="input input-bordered" />
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
              </form>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title mb-4">Professional Information</h2>
              <form className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Education</span>
                  </label>
                  <input type="text" defaultValue="PhD in Mathematics, DU" className="input input-bordered" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Subject Specialization</span>
                    </label>
                    <input type="text" defaultValue="Mathematics" className="input input-bordered" />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Experience (Years)</span>
                    </label>
                    <input type="number" defaultValue="10" className="input input-bordered" />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Hourly Rate (৳)</span>
                  </label>
                  <input type="number" defaultValue="500" className="input input-bordered" />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Bio</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24"
                    defaultValue="Experienced mathematics tutor with a passion for teaching..."
                  ></textarea>
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
