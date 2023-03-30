import { Button } from "@codegouvfr/react-dsfr/Button";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()(() => ({
  list: {
    marginBottom: 32,
  },
  contactUs: {
    marginBottom: 32,
  },
}));

export const ExportAndApis = () => {
  const { classes } = useStyles();
  return (
    <section>
      <h4>Export & APIs</h4>
      <h6>Dalles disponibles</h6>
      <div className={classes.list}>
        <ul>
          <li>37 - Tours Métropole - 2021</li>
          <li>40 - Landes - 2021</li>
        </ul>
      </div>

      <div className={classes.contactUs}>
        <p>
          Vous souhaitez vous souhaitez mettre en place ou enrichir un cas d’usage à partir des données
          CoSIA ? Répondez directement à notre questionnaire et nous vous recontacterons rapidement pour
          vous accompagner dans votre démarche.
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
        Vous êtes intéressé par la donnée ? Vous pouvez nous contactez pour nous demander les dalles déjà
        disponibles.
      </p>
      <Button iconId="fr-icon-lightbulb-line" onClick={() => console.log("click")}>
        Proposer un cas d'usage
      </Button>
    </section>
  );
};
