import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";

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
import PaymentSuccess from "../pages/dashboard/payment/PaymentSuccess";

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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Dashboard Home - accessible to all authenticated users
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <ProfileSettings />,
      },
      // Student Routes - only accessible to students
      {
        path: "student/my-tuitions",
        element: (
          <PrivateRoute allowedRoles={["student"]}>
            <MyTuitions />
          </PrivateRoute>
        ),
      },
      {
        path: "student/post-tuition",
        element: (
          <PrivateRoute allowedRoles={["student"]}>
            <PostTuition />
          </PrivateRoute>
        ),
      },
      {
        path: "student/applied-tutors",
        element: (
          <PrivateRoute allowedRoles={["student"]}>
            <AppliedTutors />
          </PrivateRoute>
        ),
      },
      {
        path: "student/payments",
        element: (
          <PrivateRoute allowedRoles={["student"]}>
            <StudentPayments />
          </PrivateRoute>
        ),
      },
      // Tutor Routes - only accessible to tutors
      {
        path: "tutor/applications",
        element: (
          <PrivateRoute allowedRoles={["tutor"]}>
            <MyApplications />
          </PrivateRoute>
        ),
      },
      {
        path: "tutor/ongoing-tuitions",
        element: (
          <PrivateRoute allowedRoles={["tutor"]}>
            <OngoingTuitions />
          </PrivateRoute>
        ),
      },
      {
        path: "tutor/revenue",
        element: (
          <PrivateRoute allowedRoles={["tutor"]}>
            <RevenueHistory />
          </PrivateRoute>
        ),
      },
      // Admin Routes - only accessible to admins
      {
        path: "admin/users",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <UserManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/tuitions",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <TuitionManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/reports",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <ReportsAnalytics />
          </PrivateRoute>
        ),
      },
      // Payment routes - accessible to students and tutors
      {
        path: "payment-success",
        element: (
          <PrivateRoute allowedRoles={["student", "tutor"]}>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
