import { fr } from "@codegouvfr/react-dsfr";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()(theme => ({
  card: {
    padding: fr.spacing("3w"),
    backgroundColor: theme.decisions.background.alt.grey.default,
    display: "flex",
    alignItems: "center",
    marginBottom: fr.spacing("4w"),
  },
  logo: {
    height: 48,
    marginRight: fr.spacing("3w"),
  },
}));

export const IgnCard = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.card}>
      <img src={require("../assets/img/ign_logo.png")} className={classes.logo} />
      <span>
        <b>Institut National de l’Information Géographique et Forestière</b>
        <br />
        <a
          title="lien vers le site de l'IGN - ouvre une nouvelle fenêtre"
          href=" https://www.ign.fr/"
          target="_blank"
          rel="noopener"
        >
          https://www.ign.fr/
        </a>
      </span>
    </div>
  );
};
