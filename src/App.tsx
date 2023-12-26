import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from "./Routes";
import Sidebar from "./components/Sidebar/Sidebar";
import CircleLoading from "./components/Loadings/CircleLoading";

function App() {
  return (
    <BrowserRouter>
        <Sidebar />
        <div style={{ left: '280px', position: 'relative' }}>
          <Routes>
            {routes.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Suspense fallback={<CircleLoading />}>
                    <Component />
                  </Suspense>
                }
              />
            ))}
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
