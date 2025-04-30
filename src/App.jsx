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
import SiteLayout from "./components/Layouts/SiteLayout";
import LogIn from "./components/pages/LogIn";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<LogIn />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
