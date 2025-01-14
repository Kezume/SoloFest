import { createHashRouter, Navigate, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import LoadingSpinner from "../components/fragments/LoadingSipnner";
import EOPages from "../pages/EOPages";
import SinglePageEvent from "../pages/EventPages/_id";
import HistoryPay from "../pages/Historypay";
import HelpPage from "../pages/HelpPage";

// Lazy load components
const Home = lazy(() => import("../views/Home"));
const RegisterPage = lazy(() => import("../pages/AuthPages/RegisterPage"));
const LoginPage = lazy(() => import("../pages/AuthPages/LoginPage"));
const EventPage = lazy(() => import("../pages/EventPages"));
const MemberDashboardPage = lazy(() => import("../pages/MemberDashboardPage"));
const ErrorPage = lazy(() => import("../pages/404"));

// Loading component
const LoadingFallback = () => <LoadingSpinner />;

// Root layout component
const RootLayout = () => {
  return <Outlet />;
};

const router = createHashRouter(
  [
    {
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Navigate to="/home" replace />
            </ProtectedRoute>
          ),
        },
        {
          path: "/home",
          element: (
            <ProtectedRoute allowedRoles={["member", "admin", "event_organizer"]}>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/event",
          element: (
            <ProtectedRoute allowedRoles={["member", "admin", "event_organizer"]}>
              <EventPage />
            </ProtectedRoute>
          ),
        },

        {
          path: "/help",
          element: (
            <ProtectedRoute allowedRoles={["member", "admin", "event_organizer"]}>
              <HelpPage />
            </ProtectedRoute>
          ),
        },

        {
          path: "/event/:id",
          element: (
            <ProtectedRoute allowedRoles={["member", "admin", "event_organizer"]}>
              <SinglePageEvent />
            </ProtectedRoute>
          ),
        },
        {
          path: "/member/dashboard",
          element: (
            <ProtectedRoute allowedRoles={["member"]}>
              <MemberDashboardPage />
            </ProtectedRoute>
          ),
        },

        {
          path: "/member/history-payment",
          element: (
            <ProtectedRoute allowedRoles={["member"]}>
              <HistoryPay />
            </ProtectedRoute>
          ),
        },

        {
          path: "/event_orgn/dashboard",
          element: (
            <ProtectedRoute allowedRoles={["event_organizer"]}>
              <EOPages />
            </ProtectedRoute>
          ),
        },
        {
          path: "/register",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <RegisterPage />
            </Suspense>
          ),
        },
        {
          path: "/login",

          element: (
            <Suspense fallback={<LoadingFallback />}>
              <LoginPage />
            </Suspense>
          ),
        },
        {
          path: "/404",
          element: <ErrorPage />,
        },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
      ],
    },
  ],
  {
    basename: "/", // This ensures proper base path handling
  }
);

export default router;
