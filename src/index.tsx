import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { Root, ErrorPage } from "geocommuns-core";

import { Home } from "./pages/Home";
import { DataInformations } from "./pages/DataInformations";
import { SiteMap } from "./pages/SiteMap";

startReactDsfr({ defaultColorScheme: "system", Link });

export enum ROUTES {
  Home = "/",
  DataInfo = "/info",
  SiteMap = "/plan-du-site",
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
        title={
          <>
            CoSIA{" "}
            <Badge severity="success" noIcon>
              Bêta
            </Badge>
          </>
        }
        contactMail="cosia@ign.fr"
        feedbackLink="https://forms.office.com/e/MVeBMBdusY"
        contentDescription={contentDescription}
        websiteMapLinkProps={{ to: ROUTES.SiteMap }}
      />
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: ROUTES.Home, element: <Home /> },
      { path: ROUTES.DataInfo, element: <DataInformations /> },
      { path: ROUTES.SiteMap, element: <SiteMap /> },
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
