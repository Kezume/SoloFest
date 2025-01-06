import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import RegisterPage from "../pages/AuthPages/RegisterPage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  }
])

export default router;