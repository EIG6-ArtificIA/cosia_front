import { fr } from "@codegouvfr/react-dsfr";
import { makeStyles } from "tss-react/dsfr";
import { DataDescriptionCard } from "../components/DataDescriptionCard/DataDescriptionCard";
import { Tabs } from "@codegouvfr/react-dsfr/Tabs";
import { useEffect, useState } from "react";

const useStyles = makeStyles()((theme) => ({
  container: {
    paddingTop: fr.spacing("10w"),
    paddingBottom: fr.spacing("10w"),
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
}));

export const DataInformations = () => {
  const { classes } = useStyles();

  const [selectedTabId, setSelectedTabId] = useState(window.location.hash.replace("#", "") || "info");

  useEffect(() => {
    window.location.hash = `#${selectedTabId}`;
  }, [selectedTabId]);

  return (
    <main className={classes.container}>
      <div className={classes.header}>
        <DataDescriptionCard />
      </div>
      <div className={classes.bodyBackground}>
        <div className={classes.body}>
          <Tabs
            selectedTabId={selectedTabId}
            tabs={[
              { tabId: "info", label: "Informations" },
              { tabId: "visualisation", label: "Visualisation" },
              { tabId: "export-&-apis", label: "Export & APIs" },
              { tabId: "cas-usages", label: "Cas d'usage" },
              { tabId: "communaute", label: "Communauté" },
              { tabId: "metadonnees", label: "Métadonnées" },
            ]}
            onTabChange={setSelectedTabId}
          >
            <p key={selectedTabId}>Content of {selectedTabId}</p>
          </Tabs>
        </div>
      </div>
    </main>
  );
};
