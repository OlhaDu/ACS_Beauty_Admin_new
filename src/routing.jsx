import { createBrowserRouter } from "react-router-dom"
import Users from "./pages/Users/Users"
import CategoriesPage from "./pages/CategoriesPage"
import Dashboard from "./pages/Dashboard/Dashboard"
import Brands from './pages/Brands/Brands'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/categories",
    element: <CategoriesPage />,
  },
  {
    path: "/brands",
    element: <Brands />,
  },
])

