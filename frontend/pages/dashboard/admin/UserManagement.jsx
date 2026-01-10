import {
  FiEdit,
  FiTrash2,
  FiSearch,
  FiUserCheck,
  FiUserX,
} from "react-icons/fi";
import { useState } from "react";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import EditUserModal from "../../../components/modals/EditUserModal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";


const UserManagement = () => {
  const [filter, setFilter] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const axiosSecure = useAxiosSecure();

  const closeModal = () => {
    setIsOpen(false);
    setEditingUser(null);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setIsOpen(true);
  };

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure(`${import.meta.env.VITE_API_URL}/users`);
      return res.data;
    },
  });

  const handleDeleteUser = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axiosSecure.delete(`/user/${id}`);
          Swal.fire({
            icon: "success",
            title: "User deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to delete user",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleUserStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/user-status/${id}`, {
        status,
      });
      refetch();
      Swal.fire({
        icon: "success",
        title: `User ${
          status === "active" ? "active" : "deactive"
        } successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to update user status",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const filteredUsers =
    filter === "all"
      ? users
      : users.filter((u) => u.role.toLowerCase() === filter);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-primary">{users.length}</div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Students</div>
            <div className="stat-value text-secondary">
              {users.filter((u) => u.role === "student").length}
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Tutors</div>
            <div className="stat-value text-accent">
              {users.filter((u) => u.role === "tutor").length}
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Active</div>
            <div className="stat-value text-success">
              {users.filter((u) => u.status === "active").length}
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
                  placeholder="Search users..."
                  className="input input-bordered w-full pr-10"
                />
                <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50" />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className={`btn ${
                  filter === "all" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`btn ${
                  filter === "student" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setFilter("student")}
              >
                Students
              </button>
              <button
                className={`btn ${
                  filter === "tutor" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setFilter("tutor")}
              >
                Tutors
              </button>
              <button
                className={`btn ${
                  filter === "admin" ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setFilter("admin")}
              >
                Admins
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                            <img src={user.photo} alt={user.name} />
                          </div>
                        </div>
                        <span className="font-semibold">{user.name}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <div
                        className={`badge ${
                          user.role === "student"
                            ? "badge-primary"
                            : user.role === "tutor"
                            ? "badge-secondary"
                            : "badge-neutral"
                        }`}
                      >
                        {user.role}
                      </div>
                    </td>
                    <td>
                      <div
                        className={`badge ${
                          user.status === "active"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {user.status}
                      </div>
                    </td>
                    <td>
                      {new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="btn btn-ghost btn-sm"
                          title="Edit"
                        >
                          <FiEdit />
                        </button>
                        {user.status === "active" ? (
                          <button
                            onClick={() =>
                              handleUserStatus(user._id, "deactive")
                            }
                            className="btn btn-ghost btn-sm text-warning"
                            title="Deactivate"
                          >
                            <FiUserX />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUserStatus(user._id, "active")}
                            className="btn btn-ghost btn-sm text-success"
                            title="Activate"
                          >
                            <FiUserCheck />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteUser(user._id)}
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

      {/* Edit User Modal */}
      {editingUser && (
        <EditUserModal
          userData={editingUser}
          refetch={refetch}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default UserManagement;
