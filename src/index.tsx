import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import { Root, ErrorPage } from "geocommuns-core";

import { Home } from "./pages/Home";
import { DataInformations } from "./pages/DataInformations";
import MapExtentSelector from "./pages/MapExtentSelector";

startReactDsfr({ defaultColorScheme: "system", Link });

export enum ROUTES {
  Home = "/",
  DataInfo = "/info",
  MapExtentSelector = "/definition-emprise",
}

declare module "@codegouvfr/react-dsfr/spa" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

const router = createBrowserRouter([
  {
    path: ROUTES.Home,
    element: <Root title="CoSIA" />,
    errorElement: <ErrorPage />,
    children: [
      { path: ROUTES.Home, element: <Home /> },
      { path: ROUTES.DataInfo, element: <DataInformations /> },
      { path: ROUTES.MapExtentSelector, element: <MapExtentSelector /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <MuiDsfrThemeProvider>
      <RouterProvider router={router} />
    </MuiDsfrThemeProvider>
  </React.StrictMode>
);
