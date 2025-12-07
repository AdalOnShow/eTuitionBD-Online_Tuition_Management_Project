import { useForm } from "react-hook-form";
import { subjectOptions } from "../../../data/subjectOptions";

const PostTuition = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Post New Tuition</h1>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="block">
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
                <label className="block">
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
                <label className="block">
                  <span className="label-text font-semibold">Class/Level</span>
                </label>
                <select
                  className="select select-bordered"
                  {...register("classLevel", {
                    required: "Please select a class/level",
                    validate: (value) =>
                      value !== "Select Class" || "Please select a class/level",
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
                <label className="block">
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
                <label className="block">
                  <span className="label-text font-semibold">Tuition Type</span>
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
                <label className="block">
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
                <label className="block">
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
                <label className="block">
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
              <div className="form-control md:col-span-2">
                <label className="block">
                  <span className="label-text font-semibold">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32"
                  placeholder="Describe your requirements..."
                  {...register("description", {
                    minLength: {
                      value: 20,
                      message: "Description must be at least 20 characters long",
                    },
                  })}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn btn-primary">
                Post Tuition
              </button>
              <button type="button" className="btn btn-ghost">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostTuition;
