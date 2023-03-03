import { fr, FrCxArg } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { Divider, Grid } from "@mui/material";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()((theme) => ({
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
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    color: theme.decisions.text.title.blueFrance.default,
    marginBottom: fr.spacing("1v"),
  },
  infoContainer: {
    marginBottom: 0,
  },
  infoItem: {
    marginBottom: fr.spacing("1v"),
  },
  icon: {
    marginRight: fr.spacing("1w"),
  },
  button: {
    [fr.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "center",
    },
  },
}));

type CounterT = { icon: FrCxArg; count: number; description: string };

const counts: CounterT[] = [
  {
    icon: "fr-icon-eye-line",
    count: 177,
    description: "Vues",
  },
  { icon: "fr-icon-download-fill", count: 82, description: "Téléchargements" },
  { icon: "fr-icon-send-plane-fill", count: 35, description: "Partages" },
];

export const DataDescriptionCard = () => {
  const { classes, cx } = useStyles();
  const dataName = "COSIA";
  const dataDescription = "COuverture du Sol par Intelligence Artificielle";

  const getCounter = ({ icon, count, description }: CounterT) => {
    return (
      <Grid item xs={12} sm="auto">
        <span className={cx(fr.cx(icon, "fr-icon--xs"), classes.icon)} />
        {count} {description}
      </Grid>
    );
  };

  return (
    <Grid container className={classes.container} spacing={3}>
      <Grid item xs={12} md="auto">
        <img
          src={require("../assets/img/carte_de_predictions_2.png")}
          className={classes.image}
          alt="Vignette donnant un aperçu des données COSIA"
        />
      </Grid>

      <Grid item xs="auto" container justifyContent="space-between" flexDirection="column">
        <Grid item className={classes.titleContainer}>
          <h1 className={classes.title}>{dataName}</h1>
          <div>
            <b>{dataDescription}</b>
          </div>
        </Grid>

        <Grid item className={classes.infoContainer}>
          <div className={classes.infoItem}>Producteur : IGN</div>

          <Grid
            container
            columnSpacing={fr.spacing("3v")}
            rowSpacing={fr.spacing("1v")}
            mb={fr.spacing("1v")}
          >
            <Grid item xs={12} sm="auto">
              Création : <time dateTime="2022-08-04">04 août 2022</time>
            </Grid>
            <Grid item xs={0} sm="auto" sx={{ display: { xs: "none", sm: "block" } }}>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item xs={12} sm="auto">
              Mise à jour : <time dateTime="2023-03-02">02 mars 2022</time>
            </Grid>
          </Grid>

          <Grid container columnSpacing={fr.spacing("3v")} rowSpacing={fr.spacing("1v")}>
            {counts.map((count) => getCounter(count))}
          </Grid>
        </Grid>
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
          <Button iconId="fr-icon-link" className={classes.button}>
            Copier l'url
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
