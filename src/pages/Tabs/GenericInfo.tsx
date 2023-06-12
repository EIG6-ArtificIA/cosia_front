import { fr } from "@codegouvfr/react-dsfr";
import { makeStyles } from "tss-react/dsfr";
import { Doc } from "../../components/DownloadLink";
import { GenericDataInfo } from "geocommuns-core";

const useStyles = makeStyles()(() => ({
  subtitle: {
    marginTop: fr.spacing("1w"),
    marginBottom: fr.spacing("2w"),
  },
}));

const DOCS: Doc[] = [
  { name: "Description", link: "/pdf/Cosia_Descriptif_IGN_2023.pdf", size: "1,2 Mo" },
  { name: "Nomenclature des classes", link: "/pdf/Cosia_Nomenclature_IGN_2023.pdf", size: "969 Ko" },
  {
    name: "Documentation technique",
    link: "/pdf/Cosia_Documentation_Technique_IGN_2023.pdf",
    size: "7,4 Mo",
  },
];

export const GenericInfo = () => {
  const { classes } = useStyles();

  const textInfo = (
    <>
      <p className={classes.subtitle}>
        <b>Descriptif</b>
      </p>
      <p>
        Les cartes CoSIA décrivent la couverture du sol, soit la nature du sol, selon 16 classes
        (bâtiment, surface d’eau, conifère, culture, broussaille...). Cette description du sol est
        produite pour tout le territoire français (métropole et DROM) et avec une haute résolution de 20
        cm par pixel.
      </p>
      <p>
        Les cartes CoSIA sont un produit de l’IGN qui interviennent actuellement dans la conception de
        l'OCSGE. Leur résolution spatiale et leur finesse sémantique peuvent également aider dans la
        production d’autres cartographies et au calcul d’autres indicateurs comme la végétation en ville,
        les haies & bocages, les trames vertes & bleues ou encore intervenir dans la réalisation de MOS
        locaux ou d’un OCS GE plus fin.
      </p>
      <p>
        Pour produire ces cartes, on utilise des processus d’intelligence artificielle dont des méthodes
        d’apprentissage profond (deep learning). Ces cartes sont alors dites de “prédiction” car elles
        sont obtenues à partir d’un modèle numérique d’IA qui estime statistiquement pour chaque pixel
        son appartenance à une classe, et peuvent ne pas refléter de manière exhaustive la réalité du
        terrain. Il existe des marges d’erreurs qui sont référencées pour chaque département et chaque
        classe (voir ressources).
      </p>
    </>
  );

  return <GenericDataInfo textInfo={textInfo} docs={DOCS} />;
};
