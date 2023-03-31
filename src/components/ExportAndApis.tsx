import { Button } from "@codegouvfr/react-dsfr/Button";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()(() => ({
  list: {
    marginBottom: 32,
  },
  contactUs: {
    marginBottom: 32,
  },
  container: {
    maxWidth: 650,
  },
}));

export const ExportAndApis = () => {
  const { classes } = useStyles();
  return (
    <section className={classes.container}>
      <h4>Export & APIs</h4>
      <h6>Dalles disponibles</h6>
      <p>
        L'IGN est en train de produire la donnée CoSIA au cas par cas pour les utilisateurs qui en font
        la demande. Cette démarche a pour but de tester et d'itérer sur la donnée afin de concevoir un
        produit qui répond aux besoins et aux usages des utilisateurs.
        <br />
        Les données déjà disponibles sont :
      </p>

      <ul className={classes.list}>
        <li>37 Indre-et-Loire - Tours Métropole - 2021</li>
        <li>
          40 Landes - Communes d'Azure, Soustons, Messanges, Seignosse et Vieux-Boucau-les-Bains - 2021
        </li>
      </ul>

      <div className={classes.contactUs}>
        <p>
          Vous êtes intéressé(e) par les données CoSIA ? Contactez-nous pour recevoir les dalles déjà
          disponibles.
        </p>
        <Button
          iconId="fr-icon-mail-line"
          priority="secondary"
          linkProps={{ to: "mailto:cosia@ign.fr" }}
        >
          Nous contacter
        </Button>
      </div>
      <p>
        Vous souhaitez mettre en place un cas d'usage à partir des données CoSIA ?<br />
        Répondez directement à notre questionnaire et nous vous recontacterons rapidement pour vous
        accompagner dans votre démarche.
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
