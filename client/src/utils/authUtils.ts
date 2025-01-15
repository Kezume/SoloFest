import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
  // add other JWT payload properties if needed
}

export const getUserRole = (): string => {
  const token = localStorage.getItem("jwtToken");
  if (!token) return "";

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.role;
  } catch {
    return "";
  }
};
