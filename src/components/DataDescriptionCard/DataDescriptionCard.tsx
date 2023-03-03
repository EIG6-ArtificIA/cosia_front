import { fr } from "@codegouvfr/react-dsfr";
import { Grid } from "@mui/material";
import { makeStyles } from "tss-react/dsfr";
import { ButtonsBlock } from "./ButtonsBlock";
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
}));

export const DataDescriptionCard = () => {
  const { classes } = useStyles();

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

      <Grid item xs={12} md alignSelf="flex-start">
        <ButtonsBlock />
      </Grid>
    </Grid>
  );
};
