import { makeStyles } from "tss-react/dsfr";
import { Download } from "@codegouvfr/react-dsfr/Download";
import { DOWNLOADABLE_TERRITORIES, DownloadableTerritory } from "../../data/downloadableTerritories";
import { fr } from "@codegouvfr/react-dsfr";
import { useCallback } from "react";
import { Grid } from "@mui/material";
import { MemoColorIconCircle as ColorIconCircle } from "../../components/ColorIconCircle";

const useStyles = makeStyles()({
  container: {},
  h6: {
    fontSize: "1rem",
    marginBottom: fr.spacing("4w"),
  },
  downloadableList: {
    [fr.breakpoints.down("md")]: {
      columns: 1,
    },
    [fr.breakpoints.up("md")]: {
      columns: 2,
    },
  },
  image: {
    width: "100%",
  },
  legend: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

  // make img a11y

  return (
    <section className={classes.container}>
      <h4>Export</h4>

      <Grid container spacing={8}>
        <Grid item xs={12} lg={6}>
          <h6 className={classes.h6}>
            <span className={cx("ri-map-pin-2-line")} /> Carte des départements en production
          </h6>
          <img
            className={classes.image}
            src={require("../../assets/img/carte_departements_disponibles.png")}
          />
          <div className={classes.legend}>
            <span>
              <ColorIconCircle color="#6A6AF4" /> Départements disponibles
            </span>
            <br />
            <span>
              <ColorIconCircle color="#E3E3FD" /> Départements bientôt disponibles
            </span>
          </div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <h6 className={classes.h6}>
            <span className={cx("fr-icon-download-line")} /> Télécharger un département
          </h6>
          <p>Toutes les données sont diffusées sous le format Geopackage.</p>

          <ul className={classes.downloadableList}>
            {DOWNLOADABLE_TERRITORIES.map(territory => generateDownloadLink(territory))}
          </ul>
        </Grid>
      </Grid>
    </section>
  );
};
