const PostTuition = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Post New Tuition</h1>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <form className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Tuition Title</span>
              </label>
              <input type="text" placeholder="e.g., Need Math Tutor for Class 10" className="input input-bordered" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Subject</span>
                </label>
                <select className="select select-bordered">
                  <option>Select Subject</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                  <option>English</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Class/Level</span>
                </label>
                <select className="select select-bordered">
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
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Salary (Monthly)</span>
                </label>
                <input type="number" placeholder="e.g., 8000" className="input input-bordered" />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Tuition Type</span>
                </label>
                <select className="select select-bordered">
                  <option>Home Tutoring</option>
                  <option>Online</option>
                  <option>Both</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Location</span>
              </label>
              <input type="text" placeholder="e.g., Dhanmondi, Dhaka" className="input input-bordered" />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Description</span>
              </label>
              <textarea className="textarea textarea-bordered h-32" placeholder="Describe your requirements..."></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Days per Week</span>
                </label>
                <input type="number" placeholder="e.g., 4" className="input input-bordered" />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Duration per Session</span>
                </label>
                <input type="text" placeholder="e.g., 1.5 hours" className="input input-bordered" />
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn btn-primary">Post Tuition</button>
              <button type="button" className="btn btn-ghost">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostTuition;
