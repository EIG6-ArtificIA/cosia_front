import { fr } from "@codegouvfr/react-dsfr";
import { makeStyles } from "tss-react/dsfr";
import { DataDescriptionCard } from "../components/DataDescriptionCard/DataDescriptionCard";
import { Tabs } from "@codegouvfr/react-dsfr/Tabs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GenericInfo } from "../components/GenericInfo";
import { MapVisualization } from "../components/MapVisualization";
import { ScrollRestoration } from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
  container: {
    paddingTop: fr.spacing("10w"),
  },
  header: {
    margin: "auto",
    maxWidth: 1200,
    width: "90%",
    paddingBottom: fr.spacing("5w"),
  },
  bodyBackground: {
    backgroundColor: theme.decisions.artwork.background.grey.default,
    paddingTop: fr.spacing("6w"),
    paddingBottom: fr.spacing("6w"),
  },
  body: {
    margin: "auto",
    maxWidth: 1200,
    width: "90%",
    backgroundColor: theme.decisions.background.default.grey.default,
  },
  tabs: {
    "& .fr-tabs__list": {
      backgroundColor: theme.decisions.artwork.background.grey.default,
    },
  },
}));

const TABS = [
  { tabId: "info", label: "Informations" },
  { tabId: "visualisation", label: "Visualisation" },
  { tabId: "export-&-apis", label: "Export & APIs" },
  { tabId: "cas-usages", label: "Cas d'usage" },
  { tabId: "communaute", label: "Communauté" },
  { tabId: "metadonnees", label: "Métadonnées" },
];

export const DataInformations = () => {
  const { classes } = useStyles();

  const [selectedTabId, setSelectedTabId] = useState(window.location.hash.replace("#", "") || "info");

  useEffect(() => {
    const label = TABS.find((t) => t.tabId === selectedTabId)?.label;
    document.title = label ? `CoSIA - ${label}` : `CoSIA - Informations`;

    if (window.location.hash === "" && selectedTabId === "info") return;
    window.location.hash = `#${selectedTabId}`;
  }, [selectedTabId]);

  const map = useMemo(() => <MapVisualization />, []);

  const renderContent = useCallback(
    (tabId: string) => {
      switch (tabId) {
        case "info":
          return <GenericInfo />;
        case "visualisation":
          return map;

        default:
          return <p key={selectedTabId}>Content of {selectedTabId}</p>;
      }
    },
    [map]
  );

  return (
    <main className={classes.container}>
      <ScrollRestoration />
      <div className={classes.header}>
        <DataDescriptionCard />
      </div>
      <div className={classes.bodyBackground}>
        <div className={classes.body}>
          <Tabs
            selectedTabId={selectedTabId}
            tabs={TABS}
            onTabChange={setSelectedTabId}
            className={classes.tabs}
          >
            {renderContent(selectedTabId)}
          </Tabs>
        </div>
      </div>
    </main>
  );
};
