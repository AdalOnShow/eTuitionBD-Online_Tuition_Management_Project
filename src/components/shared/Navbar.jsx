import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hook/useAuth";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import Swal from "sweetalert2";
import useTheme from "../../hook/useTheme";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logOut } = useAuth();

  // Theme state
  const { theme, toggleTheme } = useTheme();

  // Mock auth state - in real app, this would come from auth context
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/tuitions", label: "All Tuitions" },
    { path: "/tutors", label: "Find Tutors" },
    { path: "/contact", label: "Contact" },
    { path: "/help", label: "Help" },
    { path: "/privacy", label: "Privacy" },
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

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-40 px-4 lg:px-8">
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-content">eT</span>
          </div>
          <span className="text-xl font-bold hidden sm:inline">
            <span className="text-primary">eTuition</span>
            <span className="text-secondary">BD</span>
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`${
                  location.pathname === link.path
                    ? "bg-primary text-primary-content"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle btn-sm sm:btn-md"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? (
            <FiMoon className="text-xl" />
          ) : (
            <FiSun className="text-xl text-yellow-400" />
          )}
        </button>

        {user ? (
          <>
            <Link
              to="/dashboard"
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              Dashboard
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
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost btn-sm">
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              Register
            </Link>
          </>
        )}

        {/* Mobile Menu Button */}
        <button
          className="btn btn-ghost btn-circle lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <FiX className="text-xl" />
          ) : (
            <FiMenu className="text-xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-base-100 shadow-lg lg:hidden">
          <ul className="menu p-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`${
                    location.pathname === link.path
                      ? "bg-primary text-primary-content"
                      : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {!user && (
              <li className="sm:hidden">
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
