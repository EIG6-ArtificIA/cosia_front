import { memo } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { makeStyles } from "tss-react/dsfr";

type Props = {
  color: string;
};

const useStyles = makeStyles()(() => ({
  cercle: {
    width: "0.8rem",
    height: "0.8rem",
    marginRight: fr.spacing("1w"),
    borderRadius: 16,
    display: "inline-block",
  },
}));

const ColorIconCircle = ({ color }: Props) => {
  const { css, cx, classes } = useStyles();
  return <span className={cx(classes.cercle, css({ background: color }))} />;
};

export const MemoColorIconCircle = memo(ColorIconCircle);
