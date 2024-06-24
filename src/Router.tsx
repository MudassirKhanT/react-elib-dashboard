import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardLayout from "@/layouts/DashboardLayout";
import BooksPage from "@/pages/BooksPage";
const router = createBrowserRouter([
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "books",
        element: <BooksPage />,
      },
    ],
  },
  {
    path: "/Login",
    element: <LoginPage />,
  },
  {
    path: "/Register",
    element: <RegisterPage />,
  },
]);
export default router;
