import { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from "./Routes";
import Sidebar from "./components/Sidebar/Sidebar";
import CircleLoading from "./components/Loadings/CircleLoading";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Sidebar />
        <div className="routerWrapper" style={{ left: '280px', position: 'absolute' }}>
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
