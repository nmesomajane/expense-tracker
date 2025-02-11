import { RouteObject, useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Welcome from "../pages/Welcome";

import ScrollToTop from "../components/ScrollToTop";
import { SharedLayout } from "../components/layout/SharedLayout";

export function AppRoutes() {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <SharedLayout />
        </>
      ),
      children: [
        { 
          index: true, 
          element: <Home />
           },
        { 
          path: "welcome", 
          element: <Welcome /> 
          },
      ],
    },
  ];
  return useRoutes(routes);
}
