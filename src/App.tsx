import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routing";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <>
      {/* <h1>Hello</h1>
      <Dashboard /> */}
      {/* <AdminLayout> */}
      <RouterProvider router={router} />
      {/* </AdminLayout> */}
    </>
  );
}

export default App;
