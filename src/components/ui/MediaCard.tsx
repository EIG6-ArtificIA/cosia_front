import { makeStyles } from "tss-react/dsfr";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { fr } from "@codegouvfr/react-dsfr";
import { memo } from "react";

const useStyles = makeStyles()(theme => ({
  date: {
    color: theme.decisions.text.mention.grey.default,
    fontSize: 12,
  },
  iframe: {
    width: "100%",
  },
  name: {
    minHeight: fr.spacing("9w"),
  },
}));

type Props = {
  name: string;
  tag: string;
  date: string;
  link: string;
};

const MediaCard = ({ name, tag, date, link }: Props) => {
  const { classes, cx } = useStyles();

  // Useful for Youtube
  const linkWhereEmbedIsReplacedByWatch = link.includes("embed") ? link.replace("embed", "watch") : link;

  const card = (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia image="/static/images/cards/contemplative-reptile.jpg" title="green iguana">
        {link ? (
          <iframe
            className={classes.iframe}
            src={link}
            title={name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        ) : (
          <img className={classes.iframe} src={require("../../assets/img/placeholder_dsfr.png")} />
        )}
      </CardMedia>
      <CardContent className={cx("fr-pb-2w")}>
        <Tag key={tag}>{tag}</Tag>
        <p className={cx("fr-mt-2w", "fr-mb-2w", classes.name)}>
          <b>{name}</b>
        </p>
        <span className={classes.date}>{date}</span>
      </CardContent>
    </Card>
  );

  return link ? (
    <a href={linkWhereEmbedIsReplacedByWatch} target="_blank">
      {card}
    </a>
  ) : (
    card
  );
};

export const MemoMediaCard = memo(MediaCard);
