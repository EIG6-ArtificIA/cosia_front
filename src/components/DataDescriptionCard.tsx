import { fr, FrCxArg } from "@codegouvfr/react-dsfr";
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
      marginBottom: fr.spacing("3w"),
    },
    [fr.breakpoints.up("md")]: {
      width: 180,
      marginRight: fr.spacing("3w"),
    },
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    color: theme.decisions.text.title.blueFrance.default,
    marginBottom: 0,
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
  counters: {
    "span + span": {
      marginLeft: fr.spacing("3v"),
    },
  },
}));

export const DataDescriptionCard = () => {
  const { classes, cx } = useStyles();
  const dataName = "COSIA";
  const dataDescription = "COuverture du Sol par Intelligence Artificielle";

  type CounterT = { icon: FrCxArg; count: number; description: string };
  const getCounter = ({ icon, count, description }: CounterT) => {
    return (
      <span>
        <span className={cx(fr.cx(icon, "fr-icon--xs"), classes.icon)} />
        {count} {description}
      </span>
    );
  };

  const counts: CounterT[] = [
    {
      icon: "fr-icon-eye-line",
      count: 177,
      description: "Vues",
    },
    { icon: "fr-icon-download-fill", count: 82, description: "Téléchargements" },
    { icon: "fr-icon-send-plane-fill", count: 35, description: "Partages" },
  ];

  return (
    <div className={classes.container}>
      <img src={require("../assets/img/carte_de_predictions_2.png")} className={classes.image} />

      <div>
        <div className={classes.titleContainer}>
          <h1 className={classes.title}>{dataName}</h1>
          <div>
            <b>{dataDescription}</b>
          </div>
        </div>

        <div className={classes.infoContainer}>
          <div className={classes.infoItem}>Producteur : IGN</div>

          <div>
            Création : <time dateTime="2022-08-04">04 août 2022</time> | Mise à jour :{" "}
            <time dateTime="2023-03-02">02 mars 2022</time>
          </div>

          <div className={classes.counters}>{counts.map((count) => getCounter(count))}</div>
        </div>
      </div>
    </div>
  );
};
