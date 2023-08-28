import { fr } from "@codegouvfr/react-dsfr";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { Tag } from "@codegouvfr/react-dsfr/Tag";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()(theme => ({
  container: {
    minWidth: 360,
    marginBottom: fr.spacing("3w"),
    textAlign: "left",
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

type Props = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  source: string;
  onClick(): void;
};

export const UseCaseCard = ({ title, description, tags, image, imageAlt, source, onClick }: Props) => {
  const { classes } = useStyles();
  return (
    <button className={classes.container} onClick={onClick}>
      <Card
        detail={
          <div className={classes.detail}>
            <ul className={fr.cx("fr-tags-group")}>
              {tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </ul>
            <p className={classes.source}>{source}</p>
          </div>
        }
        enlargeLink
        linkProps={{
          to: "#cas-usages",
        }}
        imageAlt={imageAlt}
        imageUrl={image}
        title={title}
        desc={description}
      />
    </button>
  );
};
