import { fr } from "@codegouvfr/react-dsfr";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { Tag } from "@codegouvfr/react-dsfr/Tag";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()((theme) => ({
  container: { width: 360, marginBottom: fr.spacing("3w") },
  source: {
    color: theme.decisions.text.mention.grey.default,
    fontSize: 14,
    marginBottom: 0,
  },
}));

export const UseCaseCard = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <Card
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dolore magna aliqua. Vitae sapien pellentesque habitant morbi tristique senectus et"
        detail={
          <div>
            <ul className={fr.cx("fr-tags-group")}>
              <Tag>Artificialisation</Tag>
              <Tag>Urbanisme</Tag>
              <Tag>Biodiversité</Tag>
            </ul>
            <p className={classes.source}>DDT 37</p>
          </div>
        }
        enlargeLink
        linkProps={{
          to: "#cas-usages",
        }}
        imageAlt="Visuel de carte de prédiction de Tours"
        imageUrl={require("../assets/img/use_case_1.png")}
        title="Aménager avec les sols vivants en Touraine"
      />
    </div>
  );
};
