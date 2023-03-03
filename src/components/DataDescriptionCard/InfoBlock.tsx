import { fr, FrCxArg } from "@codegouvfr/react-dsfr";
import { Divider, Grid } from "@mui/material";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()((theme) => ({
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

export const InfoBlock = () => {
  const { classes, cx } = useStyles();
  const dataName = "COSIA";
  const dataDescription = "COuverture du Sol par Intelligence Artificielle";

  const getCounter = ({ icon, count, description }: CounterT) => {
    return (
      <Grid item xs={12} sm="auto" key={description}>
        <span className={cx(fr.cx(icon, "fr-icon--xs"), classes.icon)} />
        {count} {description}
      </Grid>
    );
  };

  return (
    <Grid container justifyContent="space-between" flexDirection="column">
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
  );
};
