import { Navigate, useLocation } from "react-router-dom";
import useRole from "../hook/useRole";
import useAuth from "../hook/useAuth";
import useTheme from "../hook/useTheme";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const { role, isRoleLoading } = useRole();
  const location = useLocation();
  useTheme(); // Ensure theme is applied during loading

  if (loading || isRoleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If no specific roles are required, just check authentication
  if (allowedRoles.length === 0) {
    return children;
  }

  // Check if user's role is in the allowed roles
  if (role && allowedRoles.includes(role)) {
    return children;
  }

  // Redirect to appropriate dashboard based on user role
  const redirectPath =
    role === "admin"
      ? "/dashboard/admin/users"
      : role === "tutor"
      ? "/dashboard/tutor/applications"
      : "/dashboard/student/my-tuitions";

  return <Navigate to={redirectPath} replace />;
};

export default PrivateRoute;
