import { Link } from "react-router-dom";
import {
  FiSearch,
  FiMapPin,
  FiDollarSign,
  FiFilter,
  FiBook,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useMemo } from "react";


const AllTuitions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ["tuitions"],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/tuitions`);
      return res.data.tuitions;
    },
  });

  // Get unique subjects and classes for filter options
  const { subjects, classes } = useMemo(() => {
    const subjects = [
      ...new Set(tuitions.map((t) => t.subject).filter(Boolean)),
    ];
    const classes = [...new Set(tuitions.map((t) => t.class).filter(Boolean))];
    return { subjects, classes };
  }, [tuitions]);

  // Filter and search logic
  const filteredTuitions = useMemo(() => {
    return tuitions.filter((tuition) => {
      const matchesSearch =
        searchTerm === "" ||
        tuition.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tuition.class?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tuition.title?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSubject =
        selectedSubject === "" || tuition.subject === selectedSubject;
      const matchesClass =
        selectedClass === "" || tuition.class === selectedClass;

      return matchesSearch && matchesSubject && matchesClass;
    });
  }, [tuitions, searchTerm, selectedSubject, selectedClass]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTuitions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTuitions = filteredTuitions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSubject("");
    setSelectedClass("");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Skeleton component for loading state
  const TuitionSkeleton = () => (
    <div className="card bg-base-100 shadow-lg animate-pulse">
      <div className="card-body">
        <div className="flex justify-between items-start mb-3">
          <div className="h-6 bg-base-300 rounded w-3/4"></div>
          <div className="h-6 bg-base-300 rounded w-16"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-base-300 rounded"></div>
            <div className="h-4 bg-base-300 rounded w-24"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-base-300 rounded"></div>
            <div className="h-4 bg-base-300 rounded w-20"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-base-300 rounded"></div>
            <div className="h-4 bg-base-300 rounded w-32"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-base-300 rounded"></div>
            <div className="h-4 bg-base-300 rounded w-28"></div>
          </div>
        </div>

        <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-base-300 rounded w-2/3 mb-4"></div>

        <div className="card-actions justify-end">
          <div className="h-10 bg-base-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-base-200">
      <div className="bg-linear-to-r from-primary to-secondary text-primary-content py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Browse All Tuitions</h1>
          <p className="text-lg opacity-90">
            Find the perfect tuition opportunity
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

                {/* Search Input */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-semibold">Search</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by title, subject, or class..."
                      className="input input-bordered w-full pr-10"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        handleFilterChange();
                      }}
                    />
                    <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Subject Filter */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-semibold">Subject</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={selectedSubject}
                    onChange={(e) => {
                      setSelectedSubject(e.target.value);
                      handleFilterChange();
                    }}
                  >
                    <option value="">All Subjects</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Class Filter */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-semibold">Class</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={selectedClass}
                    onChange={(e) => {
                      setSelectedClass(e.target.value);
                      handleFilterChange();
                    }}
                  >
                    <option value="">All Classes</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                {(searchTerm || selectedSubject || selectedClass) && (
                  <button
                    className="btn btn-outline btn-block"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {/* Results Info */}
            <div className="mb-4 flex justify-between items-center">
              {isLoading ? (
                <div className="h-4 bg-base-300 rounded w-48 animate-pulse"></div>
              ) : (
                <p className="text-base-content/70">
                  Showing {paginatedTuitions.length} of {filteredTuitions.length}{" "}
                  tuitions
                </p>
              )}
              {!isLoading && totalPages > 1 && (
                <p className="text-base-content/70">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>

            {/* Tuition Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isLoading ? (
                // Show skeleton cards while loading
                Array.from({ length: itemsPerPage }, (_, i) => (
                  <TuitionSkeleton key={i} />
                ))
              ) : paginatedTuitions.length > 0 ? (
                paginatedTuitions.map((tuition) => (
                  <div key={tuition._id} className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="card-title text-xl">{tuition.title}</h3>
                        {tuition.tuition_type && (
                          <div className="badge badge-primary badge-lg">
                            {tuition.tuition_type}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <FiBook className="text-primary" />
                          <span>
                            <strong>Subject:</strong> {tuition.subject}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiUser className="text-primary" />
                          <span>
                            <strong>Class:</strong> {tuition.class}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiMapPin className="text-primary" />
                          <span>{tuition.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiDollarSign className="text-success" />
                          <span className="text-success font-bold">
                            ৳{tuition.budget}/month
                          </span>
                        </div>
                      </div>

                      {tuition.description && (
                        <p className="text-base-content/70 mb-4 line-clamp-2">
                          {tuition.description}
                        </p>
                      )}

                      <div className="card-actions justify-end">
                        <Link
                          to={`/tuition/${tuition._id}`}
                          className="btn btn-primary"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-base-content/70 mb-4">
                    No tuitions found
                  </p>
                  <p className="text-base-content/50">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="join">
                  <button
                    className="join-item btn"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <FiChevronLeft /> Previous
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        className={`join-item btn ${
                          currentPage === pageNum ? "btn-active" : ""
                        }`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    className="join-item btn"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next <FiChevronRight />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTuitions;
