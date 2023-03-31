import { fr } from "@codegouvfr/react-dsfr";
import { Grid, Box } from "@mui/material";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()((theme) => ({
  subtitle: {
    marginTop: fr.spacing("1w"),
    marginBottom: fr.spacing("2w"),
  },
  card: {
    padding: fr.spacing("3w"),
    backgroundColor: theme.decisions.background.alt.grey.default,
    display: "flex",
    alignItems: "center",
    marginBottom: fr.spacing("4w"),
  },
  logo: {
    height: 48,
    marginRight: fr.spacing("3w"),
  },
  infoDoc: {
    fontSize: 12,
    color: theme.decisions.text.mention.grey.default,
  },
}));

type Doc = { name: string; link?: string; size?: string };
const DOCS: Doc[] = [
  { name: "Description", link: "/pdf/cosia-descriptif-ign.pdf", size: "1,2 Mo" },
  { name: "Nomenclature des classes", link: "/pdf/cosia-nomenclature-ign.pdf", size: "907 Ko" },
  { name: "Documentation technique" },
];

export const GenericInfo = () => {
  const { classes } = useStyles();
  const generateLink = (doc: Doc) => {
    const docInfo = doc.size ? `PDF - ${doc.size}` : "PDF";
    return (
      <div key={doc.name}>
        <a
          className="fr-link fr-icon-download-line fr-link--icon-right"
          href={doc.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          {doc.name}
        </a>
        <p className={classes.infoDoc}>{docInfo}</p>
      </div>
    );
  };

  return (
    <Grid container columnSpacing={{ md: 10 }}>
      <Grid item md={12} lg>
        <h4>Informations</h4>
        <p className={classes.subtitle}>
          <b>Descriptif</b>
        </p>
        <p>
          Les cartes CoSIA décrivent la couverture du sol, soit la nature du sol, selon 17 classes
          (bâtiment, surface d’eau, conifère, culture, broussaille...). Cette description du sol est
          produite pour tout le territoire français (métropole et DROM-TOM) et avec une haute résolution
          de 20 cm par pixel.
        </p>
        <p>
          Les cartes CoSIA sont un produit de l’IGN qui interviennent actuellement dans la conception de
          l'OCS-GE. Leur résolution spatiale et leur finesse sémantique peuvent également aider dans la
          production d’autres cartographies et au calcul d’autres indicateurs comme la végétation en
          ville, les haies & bocages, les trames vertes & bleues ou encore intervenir dans la réalisation
          de MOS locaux ou d’un OCS GE plus fin.
        </p>
        <p>
          Pour produire ces cartes, on utilise des processus d’intelligence artificielle dont des
          méthodes d’apprentissage profond (deep learning). Ces cartes sont alors dites de “prédiction”
          car elles sont obtenues à partir d’un modèle numérique d’IA qui estime statistiquement pour
          chaque pixel son appartenance à une classe, et peuvent ne pas refléter pas de manière
          exhaustive la réalité du terrain. Il existe des marges d’erreurs qui sont référencées pour
          chaque département et chaque classe (voir ressources).
        </p>
      </Grid>
      <Box component={Grid} item xs={12} display={{ xs: "block", lg: "none" }}>
        <hr />
      </Box>
      <Grid item xs={12} lg={5}>
        <p className={classes.subtitle}>
          <b>Producteur</b>
        </p>
        <div className={classes.card}>
          <img src={require("../assets/img/ign_logo.png")} className={classes.logo} />
          <span>
            <b>Institut National de l’Information Géographique et Forestière</b>
            <br />
            <a
              title="lien vers le site de l'IGN - ouvre une nouvelle fenêtre"
              href=" https://www.ign.fr/"
              target="_blank"
              rel="noopener"
            >
              https://www.ign.fr/
            </a>
          </span>
        </div>

        <hr />

        <p className={classes.subtitle}>
          <b>Ressources</b>
        </p>

        {DOCS.map((doc) => generateLink(doc))}
      </Grid>
    </Grid>
  );
};
