import { makeStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";
import { Grid } from "@mui/material";
import { MemoColorIconCircle as ColorIconCircle } from "../../components/ui/ColorIconCircle";
import { MemoDownloadForm as DownloadForm } from "../../components/DownloadForm";
import { FrenchMap } from "../../components/FrenchMap";

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
    marginTop: fr.spacing("1w"),
  },
  mapContainer: {
    flex: 1,
    [fr.breakpoints.down("md")]: {
      minHeight: 300,
    },
    [fr.breakpoints.up("md")]: {
      minHeight: 500,
    },
  },
});

export const DataExport = () => {
  const { classes, cx } = useStyles();

  return (
    <section className={classes.container}>
      <h4>Export</h4>

      <Grid container spacing={8}>
        <Grid item xs={12} lg={6}>
          <h6 className={classes.h6}>
            <span className={cx("ri-map-pin-2-line")} /> Carte des départements en production
          </h6>
          <FrenchMap className={classes.mapContainer} />
          <div className={classes.legend}>
            <span>
              <ColorIconCircle color="#6A6AF4" /> Départements disponibles
            </span>
            <span>
              <ColorIconCircle color="#E3E3FD" /> Départements bientôt disponibles
            </span>
          </div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <DownloadForm />
        </Grid>
      </Grid>
    </section>
  );
};
