import { fr } from "@codegouvfr/react-dsfr";
import { Grid } from "@mui/material";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()(() => ({
  subtitle: {
    marginBottom: fr.spacing("2w"),
  },
}));

export const GenericInfo = () => {
  const { classes } = useStyles();
  return (
    <Grid container>
      <Grid item md={12} lg>
        <h4>Informations</h4>
        <p className={classes.subtitle}>
          <b>Descriptif</b>
        </p>
        <p>
          Les cartes COSIA décrivent la couverture du sol, soit la nature du sol, selon 17 classes
          (bâtiment, surface d’eau, conifère, culture, broussaille...). Cette description du sol est
          produite pour tout le territoire français (métropole et DROM-TOM) et avec une haute résolution
          de 20 cm par pixel.
        </p>
        <p>
          Les cartes COSIA sont un produit de l’IGN qui interviennent dans la conception de l’OCS-GE ou
          de la BD Forêt par exemple. Leur résolution spatiale et leur finesse sémantique peuvent
          également aider dans la production d’autres cartographies et au calcul d’autres indicateurs
          comme la végétation en ville, les haies & bocages, les trames vertes & bleues ou encore
          intervenir dans la réalisation de MOS locaux ou d’un OCS GE plus fin.
        </p>
        <p>
          Pour produire ces cartes, on utilise des processus d’intelligence artificielle dont des
          méthodes d’apprentissage profond (deep learning). Ces cartes sont alors dites de “prédiction”
          car elles sont obtenues à partir d’un modèle numérique d’IA qui estime statistiquement pour
          chaque pixel son appartenance à une classe, et peuvent ne pas refléter pas de manière
          exhaustive la réalité du terrain. Il existe des marges d’erreurs qui sont référencées pour
          chaque département et chaque classe (voir ressources).
        </p>
      </Grid>
      <Grid item xs="auto">
        <p className={classes.subtitle}>
          <b>Producteur</b>
        </p>
      </Grid>
    </Grid>
  );
};
