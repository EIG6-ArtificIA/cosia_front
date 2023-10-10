import { memo } from "react";
import { makeStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";

const useStyles = makeStyles()(() => ({
  container: {
    maxWidth: 600,
  },
}));

const Feedback = () => {
  const { classes } = useStyles();

  return (
    <section className={classes.container}>
      <h4 className={fr.cx("fr-mb-4w")}>Retours</h4>
      <p className={fr.cx("fr-mb-4w")}>
        Dans une démarche de co-construction, l’IGN vous invite en tant qu’utilisateur à faire part de
        vos retours pour définir ensemble un produit adapté à vos besoins et vos usages.
      </p>
      <p className={fr.cx("fr-mb-2w")}>
        <b>Je donne mon avis, je remonte des anomalies ou je fais part de mes besoins sur la donnée :</b>
      </p>
      <Button linkProps={{ to: "https://forms.office.com/e/MVeBMBdusY" }}>
        Soumettre mes retours sur la donnée
      </Button>
      <p className={fr.cx("fr-mt-4w", "fr-mb-2w")}>
        <b>
          Je donne mon avis, je remonte des anomalies ou je fais part de mes besoins sur le prototype :
        </b>
      </p>
      <Button linkProps={{ to: "mailto:cosia@ign.fr?subject=Retours prototype" }} priority="secondary">
        Soumettre mes retours sur la donnée
      </Button>
    </section>
  );
};

export const MemoFeedback = memo(Feedback);
