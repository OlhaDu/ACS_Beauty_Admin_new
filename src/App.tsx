import { Suspense } from "react";
import "./App.css";
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from "./Routes";
import { store } from "./redux/store";
import Sidebar from "./components/Sidebar/Sidebar";
import CircleLoading from "./components/Loadings/CircleLoading";
import Header from "./components/Header/Header";

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
        <Header />
        <Sidebar />
        <div className="routerWrapper">
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
    </Provider>
  );
}

export default App
