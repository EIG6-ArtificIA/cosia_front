import { fr } from "@codegouvfr/react-dsfr";
import { makeStyles } from "tss-react/dsfr";
import { useConstCallback } from "powerhooks";
import { MemoizedDataDescriptionCard as DataDescriptionCard, useTabs } from "geocommuns-core";

import { GenericInfo } from "./Tabs/GenericInfo";
import { MapVisualization } from "./Tabs/MapVisualization";
import { ExportAndApis } from "./Tabs/ExportAndApis";
import { UseCases } from "./Tabs/UseCases";
import { Metadata } from "./Tabs/Metadata";

const useStyles = makeStyles()(theme => ({
  header: {
    margin: "auto",
    maxWidth: 1200,
    width: "90%",
    paddingTop: fr.spacing("7w"),
    paddingBottom: fr.spacing("7w"),
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
}));

const DEFAULT_TAB = { tabId: "descriptif", label: "Descriptif" };
const TABS = [
  DEFAULT_TAB,
  { tabId: "visualisation", label: "Visualisation" },
  { tabId: "export-&-apis", label: "Export & APIs" },
  { tabId: "cas-usages", label: "Cas d'usage" },
  { tabId: "communaute", label: "Communauté" },
  { tabId: "metadonnees", label: "Métadonnées" },
];

export const DataInformations = () => {
  const { classes } = useStyles();

  const { selectedTabId, TabsSystem } = useTabs({
    tabs: TABS,
    defaultTab: DEFAULT_TAB,
    pageTitle: "CoSIA",
  });

  const renderContent = useConstCallback((tabId: string) => {
    switch (tabId) {
      case "descriptif":
        return <GenericInfo />;
      case "visualisation":
        return <MapVisualization />;
      case "export-&-apis":
        return <ExportAndApis />;
      case "cas-usages":
        return <UseCases />;
      case "metadonnees":
        return <Metadata />;
      default:
        return <p key={selectedTabId}>🚧 Page en cours de construction</p>;
    }
  });

  return (
    <main>
      <div className={classes.header}>
        <DataDescriptionCard
          title="CoSIA"
          subtitle="Couverture du Sol par Intelligence Artificielle"
          creationDate={new Date("2023-04-04")}
          updateDate={new Date("2023-04-25")}
          image={require("../assets/img/carte_de_predictions_small.png")}
          altImage="Vignette donnant un aperçu des données CoSIA"
        />
      </div>
      <div className={classes.bodyBackground}>
        <div className={classes.body}>
          <TabsSystem renderContent={renderContent} />
        </div>
      </div>
    </main>
  );
};
