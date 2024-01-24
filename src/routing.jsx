<<<<<<< HEAD
import { createBrowserRouter } from "react-router-dom";
import Users from "./pages/Users/Users";
import Categories from "./pages/Categories/Categories";
// import Dashboard from "./pages/Dashboard/Dashboard";
import ReviewsList from "src/components/Reviews/ReviewsList/ReviewsList";
import Content from "./components/Reviews/PaginationItem/PaginationItem";
import AdminLayout from "./layouts/AdminLayout"
=======
import { createBrowserRouter } from "react-router-dom"
import Users from "./pages/Users/Users"
import CategoriesPage from "./pages/CategoriesPage"
import Dashboard from "./pages/Dashboard/Dashboard"
import Brands from "./pages/Brands/Brands"
import Orders from "./pages/Orders/Orders.tsx"
>>>>>>> 8b1bf786444514c314348d81194ef291537e2539

export const router = createBrowserRouter([
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/categories",
    element: <CategoriesPage />,
  },
  {path: '/reviews',
    element: <ReviewsList />
  },
  { path: 'reviews/:page', element: <Content /> },
  {
<<<<<<< HEAD
    path: '/',
    element: <AdminLayout />,
=======
    path: "/",
    element: <Dashboard />,
>>>>>>> 8b1bf786444514c314348d81194ef291537e2539
  },
  {
    path: "/brands",
    element: <Brands />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
])
