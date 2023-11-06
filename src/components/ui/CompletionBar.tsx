import { fr } from "@codegouvfr/react-dsfr";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles<{ completion: number }>()((theme, { completion }) => ({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    maxWidth: 210,
  },
  barBackground: {
    display: "flex",
    overflow: "hidden",
    flex: 1,
    height: 8,
    borderRadius: 9,
    backgroundColor: theme.decisions.background.open.blueFrance.default,
    marginRight: fr.spacing("2w"),
  },
  colorBar: {
    backgroundColor: theme.decisions.background.actionHigh.greenBourgeon.active,
    width: `${completion}%`,
  },
}));

type Props = {
  value: number;
};

export const CompletionBar = ({ value }: Props) => {
  const { classes } = useStyles({ completion: value });

  return (
    <div className={classes.container}>
      <div className={classes.barBackground}>
        <span className={classes.colorBar} />
      </div>
      <span>{value} %</span>
    </div>
  );
};
