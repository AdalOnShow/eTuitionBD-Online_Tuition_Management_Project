import { FiEdit, FiTrash2, FiSearch, FiUserCheck, FiUserX } from "react-icons/fi";
import { useState } from "react";

const UserManagement = () => {
  const [filter, setFilter] = useState("all");

  const users = [
    {
      id: 1,
      name: "Karim Ahmed",
      email: "karim@email.com",
      role: "Student",
      status: "Active",
      joinDate: "2024-01-15",
      tuitions: 3
    },
    {
      id: 2,
      name: "Dr. Ahmed Rahman",
      email: "ahmed@email.com",
      role: "Tutor",
      status: "Active",
      joinDate: "2024-01-10",
      tuitions: 15
    },
    {
      id: 3,
      name: "Sara Khan",
      email: "sara@email.com",
      role: "Student",
      status: "Inactive",
      joinDate: "2024-01-20",
      tuitions: 1
    },
    {
      id: 4,
      name: "Fatima Rahman",
      email: "fatima@email.com",
      role: "Tutor",
      status: "Active",
      joinDate: "2024-01-05",
      tuitions: 12
    }
  ];

  const filteredUsers = filter === "all" ? users : users.filter(u => u.role.toLowerCase() === filter);

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
              {users.filter(u => u.role === 'Student').length}
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Tutors</div>
            <div className="stat-value text-accent">
              {users.filter(u => u.role === 'Tutor').length}
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stat-title">Active</div>
            <div className="stat-value text-success">
              {users.filter(u => u.status === 'Active').length}
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
                className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={`btn ${filter === 'student' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setFilter('student')}
              >
                Students
              </button>
              <button
                className={`btn ${filter === 'tutor' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setFilter('tutor')}
              >
                Tutors
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
                  <th>Tuitions</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                            {user.name.charAt(0)}
                          </div>
                        </div>
                        <span className="font-semibold">{user.name}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <div className={`badge ${user.role === 'Tutor' ? 'badge-primary' : 'badge-secondary'}`}>
                        {user.role}
                      </div>
                    </td>
                    <td>
                      <div className={`badge ${user.status === 'Active' ? 'badge-success' : 'badge-error'}`}>
                        {user.status}
                      </div>
                    </td>
                    <td>{user.joinDate}</td>
                    <td>{user.tuitions}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-ghost btn-sm" title="Edit">
                          <FiEdit />
                        </button>
                        <button className="btn btn-ghost btn-sm text-success" title="Activate">
                          <FiUserCheck />
                        </button>
                        <button className="btn btn-ghost btn-sm text-warning" title="Deactivate">
                          <FiUserX />
                        </button>
                        <button className="btn btn-ghost btn-sm text-error" title="Delete">
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

export default UserManagement;
