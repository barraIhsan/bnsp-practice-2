import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Layout from "@/components/Layout";
import Employees from "@/pages/Employees";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/employees", element: <Employees /> },
    ],
  },
]);

export default router;
