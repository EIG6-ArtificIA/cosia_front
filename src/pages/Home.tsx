import { Button } from "@codegouvfr/react-dsfr/Button";
import { makeStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";
import { ROUTES } from "..";
import { Home as CommonHome } from "geocommuns-core";

const useStyles = makeStyles()({
  iconButton: {
    marginLeft: fr.spacing("1w"),
  },
});

const DESCRIPTION = [
  <p>
    Ce prototype est à destination de tous les utilisateurs des services IGN pour qu’ils découvrent
    CoSIA,
    <b> les cartes de couvertures du sol directement obtenues par intelligence artificielle</b>, et qui
    interviennent par exemple dans la fabrication de l’OCS-GE.
  </p>,
  <p>
    Ces données ne sont pas encore publiées sur les sites de l’IGN (à l’exception du Gers). Ce prototype
    fonctionne comme un outil de co-construction pour tester et valider les besoins et les usages
    possibles autour de ces cartes avant leur publication.
    <b> Les fonctionnalités et terminologies ne sont pas figés et peuvent faire l’objet de retours.</b>
  </p>,
  <p>
    En tant que testeur, nous vous invitons à naviguer dans cette première version et{" "}
    <b>à nous faire parvenir vos retours</b> sur les données et les interfaces.
  </p>,
  <p>
    Vous pouvez partager ce prototype à votre entourage professionnelle mais nous vous demandons de ne
    pas communiquer publiquement dessus.
  </p>,
];

export const Home = () => {
  const { cx, classes } = useStyles();
  const CTA = (
    <Button linkProps={{ to: ROUTES.DataInfo }} priority="secondary">
      Accéder au prototype
      <span
        className={cx(fr.cx("fr-icon-arrow-right-line"), classes.iconButton)}
        aria-hidden="true"
      ></span>
    </Button>
  );

  return (
    <CommonHome
      title="CoSIA"
      subtitle="La Couverture du Sol par Intelligence Artificielle"
      titleInfo="Prototype de démonstration"
      cover={require("../assets/img/carte_de_predictions.png")}
      description={DESCRIPTION}
      cta={CTA}
    />
  );
};
