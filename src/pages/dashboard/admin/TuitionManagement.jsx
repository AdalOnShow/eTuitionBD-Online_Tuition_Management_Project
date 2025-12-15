import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const TuitionManagement = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: tuitions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tuitions"],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/tuitions`);
      return res.data.tuitions;
    },
  });

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

  const filteredTuitions = tuitions
    .filter((t) => statusFilter === "all" || t.status.toLowerCase() === statusFilter)
    .filter((t) => 
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.tuition_type.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tuition Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Total Tuitions</div>
            <div className="stat-value text-primary">{tuitions.length}</div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Active</div>
            <div className="stat-value text-success">
              {tuitions.filter((t) => t.status === "active").length}
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Pending</div>
            <div className="stat-value text-warning">
              {tuitions.filter((t) => t.status === "pending").length}
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Reject</div>
            <div className="stat-value text-error">
              {tuitions.filter((t) => t.status === "reject").length}
            </div>
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50" />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className={`btn btn-sm ${
                  statusFilter === "all" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setStatusFilter("all")}
              >
                All
              </button>
              <button
                className={`btn btn-sm ${
                  statusFilter === "active" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setStatusFilter("active")}
              >
                Active
              </button>
              <button
                className={`btn btn-sm ${
                  statusFilter === "pending" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setStatusFilter("pending")}
              >
                Pending
              </button>
              <button
                className={`btn btn-sm ${
                  statusFilter === "reject" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setStatusFilter("reject")}
              >
                Reject
              </button>
            </div>
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
                {filteredTuitions.map((tuition) => (
                  <tr key={tuition._id}>
                    <td className="font-semibold">{tuition.title}</td>
                    <td>{tuition.tuition_type}</td>
                    <td>{tuition.subject}</td>
                    <td>{tuition.class}</td>
                    <td className="font-semibold">{tuition.budget}</td>
                    <td>
                      <div
                        className={`badge ${
                          tuition.status === "active"
                            ? "badge-success"
                            : tuition.status === "pending"
                            ? "badge-warning"
                            : "badge-error"
                        }`}
                      >
                        {tuition.status}
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
                      <div className="flex gap-2">
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
                              className="btn btn-ghost btn-sm text-success"
                              title="Approve"
                            >
                              <FiCheckCircle />
                            </button>
                            <button
                              onClick={() =>
                                updateTuitionStatus(tuition._id, "reject")
                              }
                              className="btn btn-ghost btn-sm text-error"
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitionManagement;
