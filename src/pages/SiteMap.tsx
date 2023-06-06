import { fr } from "@codegouvfr/react-dsfr";
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
          <a href={"/"}>Accueil</a>
        </li>
        <li>
          <a href={"/info"}>CoSIA</a>
        </li>
        <ul>
          <li>
            <a href="/info#info"> Informations</a>
          </li>
          <li>
            <a href="/info#visualisation"> Visualisation</a>
          </li>
          <li>
            <a href="/info#export-&-apis"> Export & APIs</a>
          </li>
          <li>
            <a href="/info#cas-usages"> Cas d'usage</a>
          </li>
          <li>
            <a href="/info#communaute"> Communauté</a>
          </li>
          <li>
            <a href="/info#metadonnees"> Métadonnées</a>
          </li>
        </ul>
      </ul>
    </section>
  );
};
