import { createBrowserRouter } from "react-router-dom";
import Users from "./pages/Users/Users";

export const router = createBrowserRouter([
  {
    path: "/users",
    element: <Users />,
  },
]);
