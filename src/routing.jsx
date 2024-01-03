import { createBrowserRouter } from "react-router-dom";
import Users from "./pages/Users/Users";
import CategoriesPage from "./pages/CategoriesPage";

export const router = createBrowserRouter([
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/categories",
    element: <CategoriesPage />,
  },
]);
