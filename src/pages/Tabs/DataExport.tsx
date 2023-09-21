import { makeStyles } from "tss-react/dsfr";
import { Download } from "@codegouvfr/react-dsfr/Download";
import { DOWNLOADABLE_TERRITORIES, DownloadableTerritory } from "../../data/downloadableTerritories";
import { fr } from "@codegouvfr/react-dsfr";
import { useCallback } from "react";

const useStyles = makeStyles()({
  container: {
    maxWidth: 850,
  },
  h6: {
    fontSize: "1rem",
  },
  downloadableList: {
    [fr.breakpoints.down("md")]: {
      columns: 1,
    },
    [fr.breakpoints.up("md")]: {
      columns: 2,
    },
  },
});

export const DataExport = () => {
  const { classes, cx } = useStyles();

  const generateDownloadLink = useCallback((territory: DownloadableTerritory) => {
    return (
      <li>
        <Download
          label={territory.label}
          linkProps={{ to: territory.link }}
          details={`ZIP ${territory.zipSize} - ZIP décompressé ${territory.size}`}
        />
      </li>
    );
  }, []);

  return (
    <section className={classes.container}>
      <h4>Export</h4>

      <h6 className={classes.h6}>
        Télécharger un département <span className={cx("fr-icon-download-line")} />
      </h6>
      <p>Toutes les données sont diffusées sous le format Geopackage.</p>

      <ul className={classes.downloadableList}>
        {DOWNLOADABLE_TERRITORIES.map(territory => generateDownloadLink(territory))}
      </ul>
    </section>
  );
};
