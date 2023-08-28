import Badge from "@codegouvfr/react-dsfr/Badge";
import Button from "@codegouvfr/react-dsfr/Button";
import { Tag } from "@codegouvfr/react-dsfr/Tag";
import { makeStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";

import { UseCase } from "../pages/Tabs/UseCases";

const useStyles = makeStyles()(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 800,
    margin: "auto",
    gap: fr.spacing("4w"),
  },
  header: {
    alignSelf: "flex-end",
    textAlign: "end",
  },
  image: {
    width: "100%",
  },
  details: {
    columnGap: fr.spacing("8w"),
    columnCount: 3,
    width: "100%",
    columnRule: "1px solid",
    columnRuleColor: theme.decisions.border.default.grey.default,
  },
  detailsItem: {
    breakInside: "avoid",
  },
  resources: {
    display: "flex",
    flexDirection: "column",
    gap: fr.spacing("1w"),
    marginBottom: fr.spacing("2w"),
  },
  link: {
    width: "fit-content",
  },
  contactCard: {
    borderRadius: 8,
    backgroundColor: theme.decisions.background.contrast.info.default,
    display: "flex",
    padding: fr.spacing("3v"),
    flexDirection: "row",
    gap: fr.spacing("1w"),
    width: "fit-content",
  },
  contactIcon: {
    color: theme.decisions.text.active.blueFrance.default,
    marginTop: 2,
  },
}));

type Props = {
  goBackToList(): void;
  useCase: UseCase;
};

export const UseCaseDetail = ({ goBackToList, useCase }: Props) => {
  const { classes, cx } = useStyles();

  return (
    <>
      <Button iconId="fr-icon-arrow-left-line" onClick={goBackToList} priority="tertiary no outline">
        Retour aux cas d'usages
      </Button>
      <div className={classes.container}>
        <div className={classes.header}>
          <Badge severity="info" noIcon className={fr.cx("fr-mb-1w")}>
            <span className={cx("fr-icon-time-line", "fr-icon--sm", "fr-mr-1v")} /> En Cours
          </Badge>
          <p>2 août 2023</p>
        </div>

        <div>
          <h2 className={fr.cx("fr-mb-1w")}>Dispositif de Suivi des Bocages</h2>
          <ul className={fr.cx("fr-tags-group")}>
            {useCase.tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </ul>
          <span>{useCase.source}</span>
        </div>

        <img src={useCase.image} alt={useCase.imageAlt} className={classes.image} />

        <div className={classes.details}>
          <div className={classes.detailsItem}>
            <b>Politique publique</b>
            <p>Plan national de développement pour l'agroforesterie</p>
          </div>
          <div className={classes.detailsItem}>
            <b>Commanditaire</b>
            <ul>
              <li>OFB (Office Française de la Biodiversité)</li>
              <li>MTECT (Ministère de la Transition écologique et de la Cohésion des territoires)</li>
            </ul>
          </div>
          <div className={classes.detailsItem}>
            <b>Territoire</b>
            <p>France entière</p>
          </div>
        </div>

        <div>
          <h4>Enjeux</h4>
          <p>
            Les bocages sont des puits de biodiversité dans lesquels vivent de nombreuses espèces
            animales et végétales. L’IGN et l’OFB oeuvrent pour protéger ces paysages en mettant en place
            un Dispositif de Suivi des Bocages (DSB) efficace à travers la France métropolitaine.
            L’obtention de ce suivi a pour but de dégager des tendances, d’évaluer l’efficacité des
            politiques publiques et d’aider à la prise de décision pour une meilleure préservation de ces
            paysages.
          </p>
          <h4>Approche</h4>
          <p>
            Pour cartographier les bocages, l’IGN s’est appuyé sur les spécifications de l’OFB et des
            cartes CoSIA. À partir des cartes, les objets des classes “conifère”, “feuillu“ et
            “broussaille” ont été extraits et croisés avec d’autres sources comme la BD forêt, les
            tronçons routiers ou encore le réseau hydrographique de la BD TOPO. En croisant ces données,
            l’IGN a pu extraire les éléments arborés des bocages et obtenir des premiers résultats. Par
            différents calculs d’aire et de circularité, ces éléments ont ensuite été classifiés en
            plusieurs objets comme les haies , les bosquets ou encore les arbres isolés.
          </p>
          <img
            src={require("../assets/img/use_case_DSB_2.png")}
            alt={"Test de détection des zones arborées dans le Gers en 2019"}
            className={cx(classes.image, fr.cx("fr-mb-2w"))}
          />
          <h4>Résultats et impacts</h4>
          <p>
            Les premiers tests ont été réalisés sur une zone de 100km2 au sein du département de
            l’Ile-et-Villaine où les bocages sont nombreux et présentent un véritable enjeu de
            biodiversité pour le territoire. Le script utilisé, regroupant les différents traitements, va
            être prochainement testé et contrôlé sur d’autres départements afin de l’affiner et d’établir
            un seuil de qualité. Par la suite, le script pourra être généré sur la France entière et le
            suivi des bocages pourra être mis à jour tous les trois ans par détection de changement grâce
            aux données CoSIA, et ainsi soutenir la préservation de ces paysages.
          </p>
          <h4>Partenaires</h4>
          <a
            title="lien vers le Ministère de l'Agriculture et de la Souveraineté Alimentaire - ouvre une nouvelle fenêtre"
            href="https://agriculture.gouv.fr/"
            target="_blank"
            rel="noopener"
          >
            Ministère de l'Agriculture et de la Souveraineté Alimentaire
          </a>
        </div>

        <div>
          <hr />
          <h4>Pour aller plus loin</h4>
          <div className={classes.resources}>
            <h6 className={fr.cx("fr-mb-0")}>Ressources</h6>
            <a
              title="lien de téléchargement de la définitions des haies et bocages"
              href="#"
              target="_blank"
              rel="noopener"
              className={classes.link}
            >
              Dispositif de Suivi des Bocages - IGN - Définitions des haies et bocages
            </a>
            <a
              title="lien de téléchargement de la documentation technique"
              href="#"
              target="_blank"
              rel="noopener"
              className={classes.link}
            >
              Dispositif de Suivi des Bocages - IGN - Documentation technique
            </a>
          </div>
          <h6>Contact </h6>
          <div className={classes.contactCard}>
            <span className={cx(fr.cx("fr-icon-account-circle-line"), classes.contactIcon)} />
            <div>
              <span>
                Louise Lebellecq
                <br />
                Cheffe de projet, IGN
                <br />
                <a href={"maito:louise.lebellecq@ign.fr"}>louise.lebellecq@ign.fr</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
