import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import RegisterPage from "../pages/AuthPages/RegisterPage";
import LoginPage from "../pages/AuthPages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
