import { createContext, useContext, useState, useCallback, useMemo, ReactNode, useEffect } from "react";
import { getUserRole } from "../utils/authUtils";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("jwtToken"));
  const [userRole, setUserRole] = useState(() => getUserRole());

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem("jwtToken");
    setIsAuthenticated(!!token);
    setUserRole(token ? getUserRole() : "");
  }, []);

  useEffect(() => {
    checkAuth();

    // Add event listener for storage changes
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [checkAuth]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      userRole,
      checkAuth,
    }),
    [isAuthenticated, userRole, checkAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
