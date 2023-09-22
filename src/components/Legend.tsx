import { fr } from "@codegouvfr/react-dsfr";
import { List, ListItem } from "@mui/material";
import { makeStyles } from "tss-react/dsfr";
import { MemoColorIconCircle as ColorIconCircle } from "./ColorIconCircle";
const CLASS_TO_COLOR = {
  Batiment: "#ce7079",
  "Zone imperméable": "#a6aab7",
  "Zone perméable": "#987752",
  Piscine: "#62d0ff",
  Serre: "#b9e2d4",
  "Sol nu": "#BBB096",
  "Surface eau": "#3375a1",
  Neige: "#e9effe",
  Conifère: "#126421",
  Feuillu: "#4c9129",
  Coupe: "#e48e4d",
  Brousaille: "#b5c335",
  Pelouse: "#8cd76a",
  Culture: "#decf55",
  "Terre labourée": "#d0a349",
  Vigne: "#b08290",
  Autre: "#222222",
};

const useStyles = makeStyles()(() => ({
  title: {
    marginBottom: 0,
  },
  listItem: {
    paddingTop: fr.spacing("1v"),
    paddingBottom: fr.spacing("1v"),
  },
}));

export const Legend = () => {
  const { classes } = useStyles();
  const listItems = Object.entries(CLASS_TO_COLOR).map(([key, value]) => {
    return (
      <ListItem key={key} className={classes.listItem}>
        <span>
          <ColorIconCircle color={value} /> {key}
        </span>
      </ListItem>
    );
  });

  return (
    <div>
      <h6 className={classes.title}>Classes</h6>
      <List>{listItems}</List>
    </div>
  );
};
