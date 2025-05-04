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
import AuthLayout from "./components/layouts/authLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Layouts/adminLayout";
import LogIn from "./components/pages/LogIn";
import AdminLayout from "./components/Layouts/adminLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<LogIn />} />
        </Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
