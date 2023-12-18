import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { Root, ErrorPage, PersonalData, Page, CookiesManagement } from "geocommuns-core";

import { Home } from "./pages/Home";
import { DataInformations } from "./pages/DataInformations";
import { SiteMap } from "./pages/SiteMap";
import { About } from "./pages/About";
import { LegalTerms } from "./pages/LegalTerms";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

startReactDsfr({ defaultColorScheme: "system", Link });

export enum ROUTES {
  Home = "/",
  DataInfo = "/info",
  SiteMap = "/plan-du-site",
  PersonalData = "/donnees-personnelles",
  LegalTerms = "/mentions-legales",
  CookiesManagement = "/gestion-des-cookies",
  About = "/a-propos",
  TestMap = "/test-map",
}
declare global {
  interface Window {
    _env_: { [key: string]: string };
  }
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
        quickAccessItems={[
          {
            iconId: "ri-information-line",
            linkProps: {
              to: ROUTES.About,
            },
            text: "A propos",
          },
          {
            iconId: "ri-mail-line",
            linkProps: {
              to: `mailto:contact.geoservices@ign.fr?subject=[CoSIA]`,
            },
            text: "Nous contacter",
          },
        ]}
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
        path: ROUTES.About,
        element: generatePageWithDocumentTitle({
          element: <About />,
          pageTitle: "À propos",
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
          element: <LegalTerms />,
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
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <React.StrictMode>
    <MuiDsfrThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MuiDsfrThemeProvider>
  </React.StrictMode>,
);
