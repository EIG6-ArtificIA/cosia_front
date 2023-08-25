import { Button } from "@codegouvfr/react-dsfr/Button";
import { makeStyles } from "tss-react/dsfr";
import { UseCaseCard } from "../../components/UseCaseCard";
import { UseCaseDetail } from "../../components/UseCaseDetail";
import { fr } from "@codegouvfr/react-dsfr";
import { Grid } from "@mui/material";
import { memo, useState } from "react";

const useStyles = makeStyles()(() => ({
  paragraph: {
    maxWidth: 650,
  },
  h6: {
    marginTop: fr.spacing("4w"),
    marginBottom: fr.spacing("2w"),
  },
}));

type UseCase = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  source: string;
};

const USE_CASES: UseCase[] = [
  {
    title: "Dispositif de Suivi des Bocages",
    description:
      "Les bocages sont des puits de biodiversité dans lesquels vivent de nombreuses espèces animales et végétales. L’IGN et l’OFB oeuvrent pour protéger ces paysages en mettant en place un Dispositif de Suivi des Bocages (DSB) efficace à travers la France métropolitaine. L’obtention de ce suivi a pour but de dégager des tendances, d’évaluer l’efficacité des politiques publiques et d’aider à la prise de décision pour une meilleure préservation de ces paysages.",
    tags: ["Aménagement du territoire", "Biodiversité", "Agriculture"],
    image: require("../../assets/img/use_case_DSB_1.png"),
    imageAlt: "Test de détection des zones arborées dans le Gers en 2019",
    source: "IGN - Institut national de l'information géographique et forestière",
  },
];

export const UseCases = memo(() => {
  const { classes } = useStyles();
  const [displayDetail, setDisplayDetail] = useState(false);

  const list = (
    <>
      <h4>Cas d'usage</h4>
      <Grid container spacing={2}>
        {USE_CASES.map(useCase => {
          return (
            <Grid item xs={12} lg={6} xl={4}>
              <UseCaseCard
                title={useCase.title}
                description={useCase.description}
                tags={useCase.tags}
                image={useCase.image}
                imageAlt={useCase.imageAlt}
                source={useCase.source}
                onClick={() => setDisplayDetail(true)}
              />
            </Grid>
          );
        })}
      </Grid>
      <h6 className={classes.h6}>Proposer un cas d'usage</h6>
      <p className={classes.paragraph}>
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
    </>
  );

  const detail = <UseCaseDetail goBackToList={() => setDisplayDetail(false)} />;

  return <section>{displayDetail ? detail : list}</section>;
});
