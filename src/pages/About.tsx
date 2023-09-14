import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { makeStyles } from "tss-react/dsfr";
import { getTerritories } from "../api/backendApi";
import { useMapTest } from "../components/useMapTest";

const useStyles = makeStyles()(theme => ({
  body: {
    margin: "auto",
    marginTop: fr.spacing("5w"),
    marginBottom: fr.spacing("5w"),
    maxWidth: 1200,
    width: "90%",
    backgroundColor: theme.decisions.background.default.grey.default,
  },
}));

export const About = () => {
  const { classes } = useStyles();
  return (
    <section className={classes.body}>
      <h1>À propos</h1>
      <p>
        Ce prototype est à destination de tous <b>les utilisateurs des services IGN</b> pour qu’ils
        découvrent <b>CoSIA</b>, les cartes de <b>Couvertures du sol</b> directement obtenues par{" "}
        <b>Intelligence Artificielle</b>, et qui interviennent par exemple dans la fabrication de
        l’OCSGE.
      </p>
      <p>
        Ces données ne sont pas encore publiées sur les sites de l’IGN (à l’exception du Gers). Ce
        prototype fonctionne comme <b>un outil de co-construction</b> pour tester et valider les besoins
        et les usages possibles autour de ces cartes <b>avant leur publication</b>.
      </p>
      <p>
        En tant que testeur, nous vous invitons à naviguer dans cette première version et à{" "}
        <b>nous faire parvenir vos retours</b>.
      </p>
      <p>
        Vous pouvez partager ce prototype à votre entourage professionnel mais nous vous demandons de ne
        pas communiquer publiquement dessus.
      </p>
      <p>
        <b>
          Je souhaite donner mon avis sur le prototype, remonter des bugs ou faire part de mes besoins :
        </b>
      </p>
      <Button linkProps={{ to: "mailto:cosia@ign.fr" }}>Soumettre mes retours sur le prototype</Button>
    </section>
  );
};
