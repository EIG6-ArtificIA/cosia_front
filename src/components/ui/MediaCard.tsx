import { makeStyles } from "tss-react/dsfr";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Tag from "@codegouvfr/react-dsfr/Tag";

const useStyles = makeStyles()(theme => ({
  date: {
    color: theme.decisions.text.mention.grey.default,
    fontSize: 12,
  },
}));

type Props = {
  name: string;
  tag: string;
};

export const MediaCard = ({ name, tag }: Props) => {
  const { classes, cx } = useStyles();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Tag key={tag}>{tag}</Tag>
        <p className={cx("fr-mt-2w", "fr-mb-2w")}>
          <b>{name}</b>
        </p>
        <span className={classes.date}>12 Novembre 2023</span>
      </CardContent>
    </Card>
  );
};
