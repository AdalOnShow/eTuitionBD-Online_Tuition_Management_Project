import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Public Pages
import Home from "../pages/public/Home";
import AllTuitions from "../pages/public/AllTuitions";
import TuitionDetails from "../pages/public/TuitionDetails";
import AllTutors from "../pages/public/AllTutors";
import TutorProfile from "../pages/public/TutorProfile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Contact from "../pages/public/Contact";
import NotFound from "../pages/public/NotFound";

// Student Dashboard Pages
import MyTuitions from "../pages/dashboard/student/MyTuitions";
import PostTuition from "../pages/dashboard/student/PostTuition";
import AppliedTutors from "../pages/dashboard/student/AppliedTutors";
import StudentPayments from "../pages/dashboard/student/Payments";
import StudentProfile from "../pages/dashboard/student/ProfileSettings";

// Tutor Dashboard Pages
import MyApplications from "../pages/dashboard/tutor/MyApplications";
import OngoingTuitions from "../pages/dashboard/tutor/OngoingTuitions";
import RevenueHistory from "../pages/dashboard/tutor/RevenueHistory";
import TutorProfileSettings from "../pages/dashboard/tutor/ProfileSettings";

// Admin Dashboard Pages
import UserManagement from "../pages/dashboard/admin/UserManagement";
import TuitionManagement from "../pages/dashboard/admin/TuitionManagement";
import ReportsAnalytics from "../pages/dashboard/admin/ReportsAnalytics";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/tuitions",
        element: <AllTuitions />
      },
      {
        path: "/tuitions/:id",
        element: <TuitionDetails />
      },
      {
        path: "/tutors",
        element: <AllTutors />
      },
      {
        path: "/tutors/:id",
        element: <TutorProfile />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/contact",
        element: <Contact />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // Student Routes
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "student/my-tuitions",
        element: <MyTuitions />
      },
      {
        path: "student/post-tuition",
        element: <PostTuition />
      },
      {
        path: "student/applied-tutors",
        element: <AppliedTutors />
      },
      {
        path: "student/payments",
        element: <StudentPayments />
      },
      {
        path: "student/profile",
        element: <StudentProfile />
      },
      // Tutor Routes
      {
        path: "tutor/applications",
        element: <MyApplications />
      },
      {
        path: "tutor/ongoing-tuitions",
        element: <OngoingTuitions />
      },
      {
        path: "tutor/revenue",
        element: <RevenueHistory />
      },
      {
        path: "tutor/profile",
        element: <TutorProfileSettings />
      },
      // Admin Routes
      {
        path: "admin/users",
        element: <UserManagement />
      },
      {
        path: "admin/tuitions",
        element: <TuitionManagement />
      },
      {
        path: "admin/reports",
        element: <ReportsAnalytics />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
