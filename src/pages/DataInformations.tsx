import { fr } from "@codegouvfr/react-dsfr";
import { makeStyles } from "tss-react/dsfr";
import { DataDescriptionCard } from "../components/DataDescriptionCard/DataDescriptionCard";

const useStyles = makeStyles()({
  container: {
    margin: "auto",
    maxWidth: 1200,
    width: "90%",
    paddingTop: fr.spacing("10w"),
    paddingBottom: fr.spacing("10w"),
  },
});

export const DataInformations = () => {
  const { classes } = useStyles();
  return (
    <main className={classes.container}>
      <DataDescriptionCard />
    </main>
  );
};
