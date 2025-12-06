import { Link } from "react-router-dom";
import { FiSearch, FiMapPin, FiDollarSign, FiFilter } from "react-icons/fi";
import { useState } from "react";

const AllTuitions = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const tuitions = [
    {
      id: 1,
      title: "Need Math Tutor for Class 10",
      subject: "Mathematics",
      class: "Class 10",
      location: "Dhanmondi, Dhaka",
      salary: "৳8,000/month",
      type: "Home Tutoring",
      days: "4 days/week",
      duration: "1.5 hours",
      postedDate: "2 days ago",
      applicants: 12
    },
    {
      id: 2,
      title: "English Medium Physics Teacher",
      subject: "Physics",
      class: "O Level",
      location: "Gulshan, Dhaka",
      salary: "৳12,000/month",
      type: "Online",
      days: "5 days/week",
      duration: "2 hours",
      postedDate: "1 day ago",
      applicants: 8
    },
    {
      id: 3,
      title: "Chemistry Tutor Required",
      subject: "Chemistry",
      class: "HSC",
      location: "Mirpur, Dhaka",
      salary: "৳10,000/month",
      type: "Home Tutoring",
      days: "3 days/week",
      duration: "2 hours",
      postedDate: "3 days ago",
      applicants: 15
    },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-content py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Browse All Tuitions</h1>
          <p className="text-lg opacity-90">Find the perfect tuition opportunity</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-lg mb-4">
                  <FiFilter /> Filters
                </h2>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-semibold">Search</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Search tuitions..."
                    className="input input-bordered w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary btn-block">Apply Filters</button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-4">
              {tuitions.map((tuition) => (
                <div key={tuition.id} className="card bg-base-100 shadow-lg">
                  <div className="card-body">
                    <h3 className="card-title">{tuition.title}</h3>
                    <div className="flex items-center gap-2">
                      <FiMapPin /> {tuition.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <FiDollarSign /> {tuition.salary}
                    </div>
                    <Link to={`/tuitions/${tuition.id}`} className="btn btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTuitions;
