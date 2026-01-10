import useRole from "../hook/useRole";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const { role, isRoleLoading } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRoleLoading && role) {
      if (role === "student") {
        navigate("/dashboard/student/my-tuitions", { replace: true });
      } else if (role === "tutor") {
        navigate("/dashboard/tutor/applications", { replace: true });
      } else if (role === "admin") {
        navigate("/dashboard/admin/users", { replace: true });
      }
    }
  }, [role, isRoleLoading, navigate]);

  return <LoadingSpinner />;
};

export default Dashboard;
