import { createBrowserRouter } from "react-router-dom";
import Users from "./pages/Users/Users";
import Categories from "./pages/Categories/Categories";
// import Dashboard from "./pages/Dashboard/Dashboard";
import ReviewsList from "./components/Reviews/ReviewsList/ReviewsList";
import AdminLayout from "./layouts/AdminLayout"

export const router = createBrowserRouter([
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '/categories',
    element: <Categories />,
  },
  {path: '/reviews',
    element: <ReviewsList />},
  {
    path: '/',
    element: <AdminLayout />,
  },
])
