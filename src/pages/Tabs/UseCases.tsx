import { Button } from "@codegouvfr/react-dsfr/Button";
import { makeStyles } from "tss-react/dsfr";
import { UseCaseCard } from "../../components/UseCaseCard";
import { fr } from "@codegouvfr/react-dsfr";

const useStyles = makeStyles()(() => ({
  container: {
    maxWidth: 650,
  },
  h6: {
    marginTop: fr.spacing("4w"),
    marginBottom: fr.spacing("2w"),
  },
}));

export const UseCases = () => {
  const { classes } = useStyles();
  return (
    <section className={classes.container}>
      <h4>Cas d'usage</h4>
      <UseCaseCard />
      <h6 className={classes.h6}>Proposer un cas d'usage</h6>
      <p>
        Si vous souhaitez mettre en place ou enrichir un cas d'usage à partir des données CoSIA et que
        vous souhaitez être accompagnés par l'IGN, vous pouvez remplir ce formulaire. Nous vous
        recontacterons rapidement pour définir avec vous la meilleure façon de vous accompagner.
      </p>
      <Button
        iconId="fr-icon-lightbulb-line"
        linkProps={{ to: "https://forms.office.com/e/bLTb4d6iR8 " }}
      >
        Proposer un cas d'usage
      </Button>
    </section>
  );
};
