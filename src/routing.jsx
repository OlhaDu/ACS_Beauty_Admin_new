import { createBrowserRouter } from "react-router-dom";
import Users from "./pages/Users/Users";
import Categories from "./pages/Categories/Categories";
import Dashboard from "./pages/Dashboard/Dashboard";
import Orders from "./pages/Orders/Orders.tsx";

export const router = createBrowserRouter([
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '/categories',
    element: <Categories />,
  },
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/orders',
    element: <Orders />,
  },
])
