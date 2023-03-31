import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import { Root, ErrorPage } from "geocommuns-core";

import { Home } from "./pages/Home";
import { DataInformations } from "./pages/DataInformations";

startReactDsfr({ defaultColorScheme: "system", Link });

export enum ROUTES {
  Home = "/",
  DataInfo = "/info",
}

declare module "@codegouvfr/react-dsfr/spa" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

const contentDescription =
  "Ce prototype est à destination de tous les utilisateurs des services IGN pour co-construire CoSIA, les cartes de Couvertures du Sol par Intelligence Artificielle.";

const router = createBrowserRouter([
  {
    path: ROUTES.Home,
    element: (
      <Root
        title="CoSIA"
        contactMail="cosia@ign.fr"
        feedbackLink="https://forms.office.com/e/MVeBMBdusst"
        contentDescription={contentDescription}
      />
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: ROUTES.Home, element: <Home /> },
      { path: ROUTES.DataInfo, element: <DataInformations /> },
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
