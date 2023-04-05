import { fr } from "@codegouvfr/react-dsfr";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { Tag } from "@codegouvfr/react-dsfr/Tag";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()((theme) => ({
  container: {
    width: 360,
    marginBottom: fr.spacing("3w"),
  },
  source: {
    color: theme.decisions.text.mention.grey.default,
    fontSize: 14,
    marginBottom: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  detail: {
    width: "100%",
  },
}));

export const UseCaseCard = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <Card
        detail={
          <div className={classes.detail}>
            <ul className={fr.cx("fr-tags-group")}>
              <Tag>Biodiversité</Tag>
              <Tag>Agriculture</Tag>
            </ul>
            <p className={classes.source}>OFB & IGN</p>
          </div>
        }
        enlargeLink
        linkProps={{
          to: "#cas-usages",
        }}
        imageAlt="Visuel de carte de prédiction de Tours"
        imageUrl={require("../assets/gif/use_case_1.gif")}
        title="Paysages arborés hors forêt et urbain"
        desc="Caractérisation des zone arborées hors forêt et hors  urbain dans le cadre du suivi de
        l’Anthropocène. Notre cas d’usage est en cours de test."
      />
    </div>
  );
};
