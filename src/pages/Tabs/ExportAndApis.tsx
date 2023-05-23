import { Button } from "@codegouvfr/react-dsfr/Button";
import { makeStyles } from "tss-react/dsfr";
import { Download } from "@codegouvfr/react-dsfr/Download";
import { TERRITORIES_ON_DEMAND, TerritoryOnDemand } from "../../data/availableTerritories";
import { DOWNLOADABLE_TERRITORIES, DownloadableTerritory } from "../../data/downloadableTerritories";
import { fr } from "@codegouvfr/react-dsfr";
import { useCallback } from "react";

const useStyles = makeStyles()((theme) => ({
  contactUs: {
    marginBottom: 32,
  },
  container: {
    maxWidth: 850,
  },
  ftpDetails: {
    color: theme.decisions.text.mention.grey.default,
  },
  vintage: {
    color: theme.decisions.text.mention.grey.default,
    fontSize: 12,
  },
  h5: {
    fontSize: "1.25rem",
    marginBottom: fr.spacing("4w"),
  },
  h6: {
    fontSize: "1rem",
    marginBottom: fr.spacing("1w"),
  },
  availableList: {
    [fr.breakpoints.down("md")]: {
      columns: 1,
    },
    [fr.breakpoints.up("md")]: {
      columns: 2,
    },
    [fr.breakpoints.up("lg")]: {
      columns: 3,
    },
  },
  downloadableList: {
    [fr.breakpoints.down("lg")]: {
      columns: 1,
    },
    [fr.breakpoints.up("lg")]: {
      columns: 2,
    },
  },
}));

export const ExportAndApis = () => {
  const { classes } = useStyles();

  const generateDownloadLink = useCallback((territory: DownloadableTerritory) => {
    return (
      <li>
        <Download
          label={territory.label}
          linkProps={{ to: territory.link }}
          details={`ZIP - ${territory.size}`}
        />
      </li>
    );
  }, []);

  const generateAvailableTerritoryItem = useCallback((territory: TerritoryOnDemand) => {
    return (
      <li>
        {territory.title}
        <br />
        <span className={classes.vintage}>Millésime {territory.vintage.join(" & ")}</span>
      </li>
    );
  }, []);

  return (
    <section className={classes.container}>
      <h4>Export & APIs</h4>
      <p>
        L'IGN est en train de produire la donnée CoSIA au cas par cas pour les utilisateurs qui en font
        la demande. Cette démarche a pour but de tester et d'itérer sur la donnée afin de concevoir un
        produit qui répond aux besoins et aux usages des utilisateurs.
      </p>

      <h5 className={classes.h5}>Données CoSIA disponibles</h5>

      <h6 className={classes.h6}>En téléchargement</h6>

      <ul className={classes.downloadableList}>
        {DOWNLOADABLE_TERRITORIES.map((territory) => generateDownloadLink(territory))}
      </ul>

      <h6 className={classes.h6}> Via un flux WMS</h6>
      <p>
        <ul>
          <li>Pays de Rennes (35) : https://wxs.ign.fr/5jsuu4l5fobniiv05i5p54uk/geoportail/v/wmts?</li>
        </ul>
      </p>

      <h5 className={classes.h5}>Données CoSIA à la demande</h5>
      <div className={classes.contactUs}>
        <p>
          Vous êtes intéressé.e par les données CoSIA ? Contactez-nous pour recevoir des dalles de 10 km2
          au sein de ces départements.
        </p>

        <ul className={classes.availableList}>
          {TERRITORIES_ON_DEMAND.map((territory) => generateAvailableTerritoryItem(territory))}
        </ul>

        <Button iconId="fr-icon-mail-line" linkProps={{ to: "mailto:cosia@ign.fr" }}>
          Nous contacter
        </Button>
      </div>
    </section>
  );
};
