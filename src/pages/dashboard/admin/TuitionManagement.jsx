import {
  FiEye,
  FiTrash2,
  FiSearch,
  FiCheckCircle,
  FiXCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// Skeleton component for loading state
const TableSkeleton = ({ limit }) => (
  <>
    {Array.from({ length: limit }, (_, i) => (
      <tr key={i} className="animate-pulse">
        <td>
          <div className="h-4 bg-base-300 rounded w-32"></div>
        </td>
        <td>
          <div className="h-4 bg-base-300 rounded w-20"></div>
        </td>
        <td>
          <div className="h-4 bg-base-300 rounded w-24"></div>
        </td>
        <td>
          <div className="h-4 bg-base-300 rounded w-16"></div>
        </td>
        <td>
          <div className="h-4 bg-base-300 rounded w-20"></div>
        </td>
        <td>
          <div className="h-6 bg-base-300 rounded w-16"></div>
        </td>
        <td>
          <div className="h-4 bg-base-300 rounded w-8"></div>
        </td>
        <td>
          <div className="h-4 bg-base-300 rounded w-24"></div>
        </td>
        <td>
          <div className="flex gap-1">
            <div className="h-8 w-8 bg-base-300 rounded"></div>
            <div className="h-8 w-8 bg-base-300 rounded"></div>
            <div className="h-8 w-8 bg-base-300 rounded"></div>
          </div>
        </td>
      </tr>
    ))}
  </>
);

const TuitionManagement = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-tuitions", page, searchTerm, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (searchTerm) params.append("search", searchTerm);
      if (statusFilter !== "all") params.append("status", statusFilter);

      const res = await axios(
        `${import.meta.env.VITE_API_URL}/tuitions?${params}`
      );
      return res.data;
    },
  });

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setPage(1);
  };

  const updateTuitionStatus = async (id, status) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/tuition-status/${id}`,
        { status }
      );
      refetch();
      Swal.fire({
        icon: "success",
        title: `Tuition ${
          status === "active" ? "approved" : "rejected"
        } successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to update tuition status",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDeleteTuition = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this tuition!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!",
      });

      if (result.isConfirmed) {
        await axios.delete(`${import.meta.env.VITE_API_URL}/tuition/${id}`);
        refetch();
        Swal.fire({
          title: "Deleted Success!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to delete tuition",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Extract data from backend response
  const tuitions = data?.tuitions || [];
  const totalTuitions = data?.totalTuitions || 0;
  const totalPages = data?.totalPages || 1;



  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tuition Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Total Tuitions</div>
            {isLoading ? (
              <div className="h-8 bg-base-300 rounded w-16 animate-pulse"></div>
            ) : (
              <div className="stat-value text-primary">{totalTuitions}</div>
            )}
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Active</div>
            {isLoading ? (
              <div className="h-8 bg-base-300 rounded w-12 animate-pulse"></div>
            ) : (
              <div className="stat-value text-success">
                {tuitions.filter((t) => t.status === "active").length}
              </div>
            )}
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Pending</div>
            {isLoading ? (
              <div className="h-8 bg-base-300 rounded w-12 animate-pulse"></div>
            ) : (
              <div className="stat-value text-warning">
                {tuitions.filter((t) => t.status === "pending").length}
              </div>
            )}
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Reject</div>
            {isLoading ? (
              <div className="h-8 bg-base-300 rounded w-12 animate-pulse"></div>
            ) : (
              <div className="stat-value text-error">
                {tuitions.filter((t) => t.status === "reject").length}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tuitions..."
                  className="input input-bordered w-full pr-10"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleFilterChange();
                  }}
                />
                <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50" />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className={`btn btn-sm ${
                  statusFilter === "all" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => {
                  setStatusFilter("all");
                  handleFilterChange();
                }}
              >
                All
              </button>
              <button
                className={`btn btn-sm ${
                  statusFilter === "active" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => {
                  setStatusFilter("active");
                  handleFilterChange();
                }}
              >
                Active
              </button>
              <button
                className={`btn btn-sm ${
                  statusFilter === "pending" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => {
                  setStatusFilter("pending");
                  handleFilterChange();
                }}
              >
                Pending
              </button>
              <button
                className={`btn btn-sm ${
                  statusFilter === "reject" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => {
                  setStatusFilter("reject");
                  handleFilterChange();
                }}
              >
                Reject
              </button>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-4 flex justify-between items-center">
            {isLoading ? (
              <div className="h-4 bg-base-300 rounded w-48 animate-pulse"></div>
            ) : (
              <p className="text-base-content/70">
                Showing {tuitions.length} of {totalTuitions} tuitions
              </p>
            )}
            {!isLoading && totalPages > 1 && (
              <p className="text-base-content/70">
                Page {page} of {totalPages}
              </p>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Tuition Type</th>
                  <th>Subject</th>
                  <th>Class</th>
                  <th>Salary</th>
                  <th>Status</th>
                  <th>Applicants</th>
                  <th>Posted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <TableSkeleton limit={limit} />
                ) : tuitions && tuitions.length > 0 ? (
                  tuitions.map((tuition) => (
                    <tr key={tuition._id}>
                      <td className="font-semibold">{tuition.title}</td>
                      <td>{tuition.tuition_type}</td>
                      <td>{tuition.subject}</td>
                      <td>{tuition.class}</td>
                      <td className="font-semibold">{tuition.budget}</td>
                      <td>
                        <div
                          className={`badge badge-lg ${
                            tuition.status === "active"
                              ? "badge-success"
                              : tuition.status === "pending"
                              ? "badge-warning"
                              : "badge-error"
                          }`}
                        >
                          {tuition.status.toUpperCase()}
                        </div>
                      </td>
                      <td>{tuition.applicants || 0}</td>
                      <td>
                        {new Date(tuition.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td>
                        <div className="flex gap-1">
                          <Link
                            to={`/tuition/${tuition._id}`}
                            className="btn btn-ghost btn-sm"
                            title="View"
                          >
                            <FiEye />
                          </Link>
                          {tuition.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  updateTuitionStatus(tuition._id, "active")
                                }
                                className="btn btn-success btn-sm"
                                title="Approve"
                              >
                                <FiCheckCircle />
                              </button>
                              <button
                                onClick={() =>
                                  updateTuitionStatus(tuition._id, "reject")
                                }
                                className="btn btn-error btn-sm"
                                title="Reject"
                              >
                                <FiXCircle />
                              </button>
                            </>
                          )}

                          <button
                            onClick={() => handleDeleteTuition(tuition._id)}
                            className="btn btn-ghost btn-sm text-error"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-12">
                      <div className="text-6xl mb-4">📚</div>
                      <h3 className="text-xl font-semibold mb-2">
                        No Tuitions Found
                      </h3>
                      <p className="text-base-content/70">
                        No tuitions match the current filter criteria.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="join">
                <button
                  className="join-item btn"
                  disabled={!data?.hasPrevPage}
                  onClick={() => setPage(page - 1)}
                >
                  <FiChevronLeft /> Previous
                </button>

                <span className="join-item btn btn-disabled">
                  Page {page} of {totalPages}
                </span>

                <button
                  className="join-item btn"
                  disabled={!data?.hasNextPage}
                  onClick={() => setPage(page + 1)}
                >
                  Next <FiChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TuitionManagement;
