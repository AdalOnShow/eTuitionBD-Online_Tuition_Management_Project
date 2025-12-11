import { Link } from "react-router-dom";
import { FiSearch, FiFilter, FiStar } from "react-icons/fi";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const AllTutors = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const res = await axios(
        `${import.meta.env.VITE_API_URL}/users?role=tutor`
      );

      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-base-200">
      <div className="bg-linear-to-r from-primary to-secondary text-primary-content py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Find Expert Tutors</h1>
          <p className="text-lg opacity-90">
            Browse verified tutors and find the perfect match
          </p>
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
                    placeholder="Search tutors..."
                    className="input input-bordered w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary btn-block">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutors.map((tutor) => (
                <div
                  key={tutor._id}
                  className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="card-body">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="avatar">
                        <div className="w-16 h-16 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl font-bold">
                          <img src={tutor.photo} alt={tutor.name} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{tutor.name}</h3>
                        <p className="text-sm text-base-content/70">
                          {tutor.subjects[0]}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Education:</strong> {tutor.education}
                      </p>
                      <p>
                        <strong>Location:</strong> {tutor.address}
                      </p>
                      <p className="text-success font-semibold">
                        ৳{tutor.hourly_rate}/hour
                      </p>
                      <div className="flex items-center gap-2">
                        <FiStar className="text-warning fill-warning" />
                        <span className="font-semibold">{tutor.rating}</span>
                        <span className="text-base-content/70">
                          (4.8 reviews)
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/tutors/${tutor._id}`}
                      className="btn btn-primary btn-sm mt-4"
                    >
                      View Profile
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

export default AllTutors;
