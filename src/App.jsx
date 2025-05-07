import React from "react";
import { Button } from "./components/ui/button";
import "./index.css";
import "./i18n";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthLayout from "./components/Layouts/authLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Layouts/adminLayout";
import LogIn from "./components/pages/LogIn";
import AdminLayout from "./components/Layouts/adminLayout";
import Customers from "./components/pages/Customers";

export const routingPaths = {
  home: "/",
  login: "/login",
  customers: "/customers",
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* <Route path="/" element={<AuthLayout />} /> */}

        <Route element={<AuthLayout />}>
          <Route path={routingPaths.login} element={<LogIn />} />
        </Route>
        <Route
          path={routingPaths.home}
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Customers />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
