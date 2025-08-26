import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Loader from "./components/Loader.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUp from "./pages/SignUp.jsx";
import ProtectRoutes from "./components/ProtectRoutes.jsx";
// import EditPage from "./pages/EditPage.jsx";
// import CreatePage from "./pages/CreatePage.jsx";

const CreatePage = lazy(() => import("./pages/CreatePage.jsx"));
const EditPage = lazy(() => import("./pages/EditPage.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/login"} />,
    errorElement : <h1 className="h-screen grid place-content-center text-white text-5xl font-black">404! Page Not Found</h1>
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: (
      <ProtectRoutes>
        <HomePage />
      </ProtectRoutes>
    ),
  },
  {
    path: "/edit/:id",
    element: (
      <ProtectRoutes>
        <Suspense fallback={<Loader />}>
          <EditPage />
        </Suspense>
      </ProtectRoutes>
    ),
  },
  {
    path: "/create",
    element: (
      <ProtectRoutes>
        <Suspense fallback={<Loader />}>
          <CreatePage />
        </Suspense>
      </ProtectRoutes>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
