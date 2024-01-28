import { createBrowserRouter } from "react-router-dom"
import Users from "./pages/Users/Users"
import CategoriesPage from "./pages/CategoriesPage"
import Dashboard from "./pages/Dashboard/Dashboard"
import Brands from "./pages/Brands/Brands"
import Orders from "./pages/Orders/Orders.tsx"
import Profile from "./pages/Profile/Profile.tsx"

export const router = createBrowserRouter([
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/categories",
    element: <CategoriesPage />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/brands",
    element: <Brands />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
])
