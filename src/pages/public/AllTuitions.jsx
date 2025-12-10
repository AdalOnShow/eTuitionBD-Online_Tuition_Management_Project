import { Link } from "react-router-dom";
import { FiSearch, FiMapPin, FiDollarSign, FiFilter } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const AllTuitions = () => {

  const { data: tuitions, isLoading } = useQuery({
    queryKey: ["tuitions"],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/tuitions`);
      return res.data;
    }
  });

  if(isLoading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-base-200">
      <div className="bg-linear-to-r from-primary to-secondary text-primary-content py-12">
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
                  />
                </div>
                <button className="btn btn-primary btn-block">Apply Filters</button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-4">
              {tuitions.map((tuition) => (
                <div key={tuition._id} className="card bg-base-100 shadow-lg">
                  <div className="card-body">
                    <h3 className="card-title">{tuition.title}</h3>
                    <div className="flex items-center gap-2">
                      <FiMapPin /> {tuition.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <FiDollarSign /> {tuition.budget}
                    </div>
                    <Link to={`/tuition/${tuition._id}`} className="btn btn-primary">
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
