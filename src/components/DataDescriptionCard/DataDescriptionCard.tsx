import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Grid } from "@mui/material";
import { useCallback } from "react";
import { makeStyles } from "tss-react/dsfr";
import { InfoBlock } from "./InfoBlock";

const useStyles = makeStyles()(() => ({
  container: {
    display: "flex",
    [fr.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  image: {
    objectFit: "cover",
    height: 180,
    borderRadius: 8,
    [fr.breakpoints.down("md")]: {
      width: "100%",
    },
    [fr.breakpoints.up("md")]: {
      width: 180,
    },
  },
  button: {
    [fr.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "center",
    },
  },
}));

export const DataDescriptionCard = () => {
  const { classes } = useStyles();

  const copyUrlToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(window.location.href);
  }, []);

  return (
    <Grid container className={classes.container} spacing={3}>
      <Grid item xs={12} md="auto">
        <img
          src={require("../../assets/img/carte_de_predictions_2.png")}
          className={classes.image}
          alt="Vignette donnant un aperçu des données COSIA"
        />
      </Grid>

      <Grid item xs="auto" container>
        <InfoBlock />
      </Grid>

      <Grid
        item
        xs={12}
        md
        alignSelf="flex-start"
        container
        spacing={2}
        justifyContent={{ xs: "flex-start", md: "flex-end" }}
      >
        <Grid item xs={12} sm="auto">
          <Button iconId="fr-icon-star-line" className={classes.button}>
            Ajouter à mes favoris
          </Button>
        </Grid>

        <Grid item xs={12} sm="auto">
          <Button iconId="fr-icon-link" className={classes.button} onClick={copyUrlToClipboard}>
            Copier l'url
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
