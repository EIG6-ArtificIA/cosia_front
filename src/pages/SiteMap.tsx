import { fr } from "@codegouvfr/react-dsfr";
import { Link } from "react-router-dom";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()((theme) => ({
  body: {
    margin: "auto",
    marginTop: fr.spacing("5w"),
    maxWidth: 1200,
    width: "90%",
    backgroundColor: theme.decisions.background.default.grey.default,
  },
  noBullet: {
    "& li": {
      listStyleType: "none",
      padding: 0,
      margin: 0,
      marginBottom: fr.spacing("2w"),
    },
  },
}));

export const SiteMap = () => {
  const { classes } = useStyles();
  return (
    <section className={classes.body}>
      <h1>Plan du site</h1>
      <ul className={classes.noBullet}>
        <li>
          <Link to={"/"}>Accueil</Link>
        </li>
        <li>
          <Link to={"/info"}>CoSIA</Link>
        </li>
        <ul>
          <li>
            <Link to="/info#descriptif"> Descriptif</Link>
          </li>
          <li>
            <Link to="/info#visualisation"> Visualisation</Link>
          </li>
          <li>
            <Link to="/info#export-&-apis"> Export & APIs</Link>
          </li>
          <li>
            <Link to="/info#cas-usages"> Cas d'usage</Link>
          </li>
          <li>
            <Link to="/info#communaute"> Communauté</Link>
          </li>
          <li>
            <Link to="/info#metadonnees"> Métadonnées</Link>
          </li>
        </ul>
      </ul>
    </section>
  );
};
