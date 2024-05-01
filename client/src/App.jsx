import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import Nav from "./components/section/Nav";
import { AuthContext } from "./contexts/AuthContext";
const Login = lazy(() => import("./components/pages/publicPages/Login"));
const Dashboard = lazy(() =>
  import("./components/pages/privatePages/Dashboard")
);

//Layout for Application
const Root = ({isAuth}) => {
  return (
    <div className="dark:bg-[#010101] min-h-[100vh]">
      {isAuth && <Nav />}
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

function App() {
  const { isAuth } = useContext(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root isAuth={isAuth} />}>

        {/* public routes */}
        <Route
          index
          element={
            isAuth ? <Navigate to={"/dashboard"} /> : <Navigate to={"/login"} />
          }
        >
        </Route>
          <Route path="/login" element={<Login />} />

            {/* Private Routes */}
        <Route element={isAuth ? <Outlet /> : <Navigate to={"login"} />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
