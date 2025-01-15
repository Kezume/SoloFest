import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../views/Home";
import RegisterPage from "../pages/AuthPages/RegisterPage";
import LoginPage from "../pages/AuthPages/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";
import EventPage from "../pages/EventPages";
import MemberDashboardPage from "../pages/MemberDashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: localStorage.getItem("jwtToken") ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />,
  },
  {
    path: "/home",
    element: (
      // <ProtectedRoute>
        <Home />
      // </ProtectedRoute> 
    ),
  },

  {
    path: "/event",
    element: (
      <ProtectedRoute>
        <EventPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/profile/dashboard",
    element: (
      <ProtectedRoute>
        <MemberDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: localStorage.getItem("jwtToken") ? <Navigate to="/home" replace /> : <RegisterPage />,
  },
  {
    path: "/login",
    element: localStorage.getItem("jwtToken") ? <Navigate to="/home" replace /> : <LoginPage />,
  },
  // Catch-all route
  {
    path: "*",
    element: localStorage.getItem("jwtToken") ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />,
  },
]);

export default router;
