import { Button } from "@codegouvfr/react-dsfr/Button";
import { makeStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";
import { ROUTES } from "..";

const ligthTheme = fr.getColors(false);
const useStyles = makeStyles<{ backgroundImage: string }>()((theme, { backgroundImage }) => ({
  titleTexts: {
    position: "absolute",
    textAlign: "center",
    padding: fr.spacing("2w"),
    [fr.breakpoints.down("md")]: { width: "90%" },
    [fr.breakpoints.up("md")]: { width: "70%" },
    [fr.breakpoints.up("lg")]: { width: "50%" },
  },
  titleBlock: {
    height: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${backgroundImage})`,
    minHeight: 600,
    backgroundSize: "cover",
  },
  title: {
    color: ligthTheme.decisions.text.inverted.grey.default,
    fontSize: 64,
  },
  subtitle: {
    color: ligthTheme.decisions.text.inverted.grey.default,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
    lineHeight: fr.spacing("7w"),
  },
  titleInfo: {
    fontVariantCaps: "all-small-caps",
    color: ligthTheme.decisions.text.inverted.grey.default,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: fr.spacing("8w"),
  },
  iconButton: {
    marginLeft: fr.spacing("1w"),
  },
}));

export const Home = () => {
  const { cx, classes } = useStyles({
    backgroundImage: require("../assets/img/carte_de_predictions.jpg"),
  });
  console.log("Hollande", process.env.REACT_APP_MATOMO_SITE_ID);

  return (
    <section className={classes.titleBlock}>
      <div className={classes.titleTexts}>
        <h1 className={classes.title}>CoSIA</h1>
        <h2 className={classes.subtitle}>La Couverture du Sol par Intelligence Artificielle</h2>
        <p className={classes.titleInfo}>Prototype de démonstration</p>

        <Button linkProps={{ to: ROUTES.DataInfo }}>
          Accéder au prototype
          <span
            className={cx(fr.cx("fr-icon-arrow-right-line"), classes.iconButton)}
            aria-hidden="true"
          ></span>
        </Button>
      </div>
    </section>
  );
};
