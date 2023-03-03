import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { Grid, Snackbar } from "@mui/material";
import { useCallback, useState } from "react";
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
  // TODO Optimize all
  const { classes } = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const copyUrlToClipboard = useCallback(async () => {
    await navigator.clipboard.writeText(window.location.href);
    setSnackbarOpen(true);
  }, []);

  const handleClose = useCallback(() => setSnackbarOpen(false), []);

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          description="L'URL a bien été copié !"
          closable
          small
        />
      </Snackbar>
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
    </>
  );
};
