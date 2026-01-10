import { Outlet, Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiBook,
  FiUsers,
  FiDollarSign,
  FiSettings,
  FiFileText,
  FiCheckCircle,
  FiBarChart2,
  FiMenu,
} from "react-icons/fi";
import { useState } from "react";
import useRole from "../hook/useRole";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import Swal from "sweetalert2";
import useAuth from "../hook/useAuth";
import { CgProfile } from "react-icons/cg";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role: userRole, isRoleLoading } = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  const studentMenuItems = [
    {
      path: "/dashboard/student/my-tuitions",
      label: "My Tuitions",
      icon: <FiBook />,
    },
    {
      path: "/dashboard/student/post-tuition",
      label: "Post Tuition",
      icon: <FiFileText />,
    },
    {
      path: "/dashboard/student/applied-tutors",
      label: "Applied Tutors",
      icon: <FiUsers />,
    },
    {
      path: "/dashboard/student/payments",
      label: "Payments",
      icon: <FiDollarSign />,
    },
    {
      path: "/dashboard/profile",
      label: "Profile Settings",
      icon: <FiSettings />,
    },
  ];

  const tutorMenuItems = [
    {
      path: "/dashboard/tutor/applications",
      label: "My Applications",
      icon: <FiFileText />,
    },
    {
      path: "/dashboard/tutor/ongoing-tuitions",
      label: "Ongoing Tuitions",
      icon: <FiCheckCircle />,
    },
    {
      path: "/dashboard/tutor/revenue",
      label: "Revenue History",
      icon: <FiDollarSign />,
    },
    {
      path: "/dashboard/profile",
      label: "Profile Settings",
      icon: <FiSettings />,
    },
  ];

  const adminMenuItems = [
    {
      path: "/dashboard/admin/users",
      label: "User Management",
      icon: <FiUsers />,
    },
    {
      path: "/dashboard/admin/tuitions",
      label: "Tuition Management",
      icon: <FiBook />,
    },
    {
      path: "/dashboard/admin/reports",
      label: "Reports & Analytics",
      icon: <FiBarChart2 />,
    },
  ];

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You you want to log out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logOut!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            title: "LogOut Success!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };

  const menuItems =
    userRole === "student"
      ? studentMenuItems
      : userRole === "tutor"
      ? tutorMenuItems
      : adminMenuItems;

  return (
    <div className="min-h-screen bg-base-200">
      {/* Top Bar */}
      <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
        <div className="flex-none lg:hidden">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu className="text-xl" />
          </button>
        </div>
        <div className="flex justify-between w-full max-w-11/12 mx-auto">
          <div className="flex-1">
            <Link
              to="/"
              className="btn btn-ghost text-xl font-bold text-primary"
            >
              eTuitionBD
            </Link>
          </div>
          <div className="flex-none gap-2">
            <Link to="/" className="btn btn-ghost btn-sm mr-4">
              <FiHome className="mr-2" /> Home
            </Link>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                  {user?.photoURL ? (
                    <img src={user?.photoURL} alt={user?.displayName} />
                  ) : (
                    <CgProfile className="size-full text-white p-0.5" />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/dashboard/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 fixed lg:sticky top-[64px] left-0 z-40
          w-64 h-[calc(100vh-64px)] bg-base-100 shadow-lg
          transition-transform duration-300 ease-in-out
          overflow-y-auto
        `}
        >
          <div className="p-4">
            <div className="mb-6">
              <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                <div className="avatar">
                  <div className="w-12 rounded-full bg-primary text-primary-content flex items-center justify-center">
                    {user?.photoURL ? (
                    <img src={user?.photoURL} alt={user?.displayName} />
                  ) : (
                    <CgProfile className="size-full text-white p-0.5" />
                  )}
                  </div>
                </div>
                <div>
                  <p className="font-semibold">{user?.displayName}</p>
                  <p className="text-xs text-base-content/60 capitalize">
                    {userRole}
                  </p>
                </div>
              </div>
            </div>

            <ul className="menu w-full p-0 space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 w-full ${
                      location.pathname === item.path
                        ? "bg-primary text-primary-content"
                        : ""
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
