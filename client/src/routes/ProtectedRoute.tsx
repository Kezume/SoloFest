import { memo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  allowedRoles?: string[];
}

const ProtectedRoute = memo(({ children, redirectTo = "/login", allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, userRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return <>{children}</>;
});

ProtectedRoute.displayName = "ProtectedRoute";
export default ProtectedRoute;
