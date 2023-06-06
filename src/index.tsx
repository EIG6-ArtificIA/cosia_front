import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { Root, ErrorPage, PersonalData, LegalTerms, Page, CookiesManagement } from "geocommuns-core";

import { Home } from "./pages/Home";
import { DataInformations } from "./pages/DataInformations";
import { SiteMap } from "./pages/SiteMap";

startReactDsfr({ defaultColorScheme: "system", Link });

export enum ROUTES {
  Home = "/",
  DataInfo = "/info",
  SiteMap = "/plan-du-site",
  PersonalData = "/donnees-personnelles",
  LegalTerms = "/mentions-legales",
  CookiesManagement = "/gestion-des-cookies",
}

declare module "@codegouvfr/react-dsfr/spa" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

const contentDescription =
  "Ce prototype est à destination de tous les utilisateurs des services IGN pour co-construire CoSIA, les cartes de Couvertures du Sol par Intelligence Artificielle.";

const generatePageWithDocumentTitle = ({
  element,
  pageTitle,
  scrollRestoration = false,
}: {
  element: JSX.Element;
  pageTitle?: string;
  scrollRestoration?: boolean;
}) => {
  const title = pageTitle ? `CoSIA - ${pageTitle}` : "CoSIA";
  return (
    <Page title={title} scrollRestoration={scrollRestoration}>
      {element}
    </Page>
  );
};

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
        personalDataLinkProps={{ to: ROUTES.PersonalData }}
        termsLinkProps={{ to: ROUTES.LegalTerms }}
        cookiesManagementLinkProps={{ to: ROUTES.CookiesManagement }}
        websiteMapLinkProps={{ to: ROUTES.SiteMap }}
      />
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: ROUTES.Home, element: generatePageWithDocumentTitle({ element: <Home /> }) },
      {
        path: ROUTES.DataInfo,
        element: generatePageWithDocumentTitle({
          element: <DataInformations />,
          scrollRestoration: true,
        }),
      },
      {
        path: ROUTES.SiteMap,
        element: generatePageWithDocumentTitle({
          element: <SiteMap />,
          pageTitle: "Plan du site",
          scrollRestoration: true,
        }),
      },
      {
        path: ROUTES.PersonalData,
        element: generatePageWithDocumentTitle({
          element: <PersonalData />,
          pageTitle: "Données personnelles",
          scrollRestoration: true,
        }),
      },
      {
        path: ROUTES.LegalTerms,
        element: generatePageWithDocumentTitle({
          element: (
            <LegalTerms
              teamName="ArtificIA"
              teamUrl="https://eig.etalab.gouv.fr/defis/artificia/"
              teamEmail="cosia@ign.fr"
            />
          ),
          pageTitle: "Mentions Légales",
          scrollRestoration: true,
        }),
      },
      {
        path: ROUTES.CookiesManagement,
        element: generatePageWithDocumentTitle({
          element: <CookiesManagement />,
          pageTitle: "Gestion des cookies",
          scrollRestoration: true,
        }),
      },
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
