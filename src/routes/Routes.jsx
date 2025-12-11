import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";

// Public Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AllTuitions from "../pages/public/AllTuitions";
import AllTutors from "../pages/public/AllTutors";
import Contact from "../pages/public/Contact";
import Home from "../pages/public/Home";
import NotFound from "../pages/public/NotFound";
import TuitionDetails from "../pages/public/TuitionDetails";
import TutorProfile from "../pages/public/TutorProfile";

// Student Dashboard Pages
import MyTuitions from "../pages/dashboard/student/MyTuitions";
import PostTuition from "../pages/dashboard/student/PostTuition";

import AppliedTutors from "../pages/dashboard/student/AppliedTutors";
import StudentPayments from "../pages/dashboard/student/Payments";

// Tutor Dashboard Pages
import MyApplications from "../pages/dashboard/tutor/MyApplications";
import OngoingTuitions from "../pages/dashboard/tutor/OngoingTuitions";
import RevenueHistory from "../pages/dashboard/tutor/RevenueHistory";

// Admin Dashboard Pages
import Dashboard from "../pages/Dashboard";
import ReportsAnalytics from "../pages/dashboard/admin/ReportsAnalytics";
import TuitionManagement from "../pages/dashboard/admin/TuitionManagement";
import UserManagement from "../pages/dashboard/admin/UserManagement";
import ProfileSettings from "../pages/dashboard/ProfileSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tuitions",
        element: <AllTuitions />,
      },
      {
        path: "/tuition/:id",
        element: <TuitionDetails />,
      },
      {
        path: "/tutors",
        element: <AllTutors />,
      },
      {
        path: "/tutors/:id",
        element: <TutorProfile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // Student Routes
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <ProfileSettings />,
      },
      {
        path: "student/my-tuitions",
        element: <MyTuitions />,
      },
      {
        path: "student/post-tuition",
        element: <PostTuition />,
      },

      {
        path: "student/applied-tutors",
        element: <AppliedTutors />,
      },
      {
        path: "student/payments",
        element: <StudentPayments />,
      },
      // Tutor Routes
      {
        path: "tutor/applications",
        element: <MyApplications />,
      },
      {
        path: "tutor/ongoing-tuitions",
        element: <OngoingTuitions />,
      },
      {
        path: "tutor/revenue",
        element: <RevenueHistory />,
      },
      // Admin Routes
      {
        path: "admin/users",
        element: <UserManagement />,
      },
      {
        path: "admin/tuitions",
        element: <TuitionManagement />,
      },
      {
        path: "admin/reports",
        element: <ReportsAnalytics />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
