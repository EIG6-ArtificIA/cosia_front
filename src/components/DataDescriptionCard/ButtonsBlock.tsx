import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Grid } from "@mui/material";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()(() => ({
  button: {
    [fr.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "center",
    },
  },
}));

export const ButtonsBlock = () => {
  const { classes } = useStyles();

  return (
    <Grid container spacing={2} justifyContent={{ xs: "flex-start", md: "flex-end" }}>
      <Grid item xs={12} sm="auto">
        <Button iconId="fr-icon-star-line" className={classes.button}>
          Ajouter à mes favoris
        </Button>
      </Grid>

      <Grid item xs={12} sm="auto">
        <Button iconId="fr-icon-link" className={classes.button}>
          Copier l'url
        </Button>
      </Grid>
    </Grid>
  );
};
