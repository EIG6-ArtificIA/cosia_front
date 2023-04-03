import Grid from "@mui/material/Grid";
import { Tag } from "@codegouvfr/react-dsfr/Tag";
import { makeStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";

const useStyles = makeStyles()(() => ({
  container: {},
}));

type BlockItem = {
  title: string;
  child: string | JSX.Element;
};

type Block = {
  title: string;
  children: BlockItem[];
};

const generateTagsList = (words: string[]) =>
  words.map((w) => (
    <Tag key={w} className={fr.cx("fr-mr-1w")}>
      {w}
    </Tag>
  ));

const genericInfoItems: BlockItem[] = [
  {
    title: "Titre du jeu de données",
    child: "CoSIA",
  },
  {
    title: "Identifiant unique",
    child: "CoSIA",
  },
  {
    title: "Résumé",
    child:
      "Les cartes COSIA décrivent la couverture du sol, soit la nature du sol, selon 17 classes (bâtiment, surface d’eau, conifère, culture, broussaille...). Cette description du sol est produite pour tout le territoire français (métropole et DROM-TOM) et avec une haute résolution de 20 cm par pixel.",
  },
  {
    title: "Thème",
    child: <>{generateTagsList(["Aménagement du territoire", "Biodiversité", "Climat", "Forêt"])}</>,
  },
  {
    title: "Mots-clefs",
    child: <>{generateTagsList(["Couvertuse du sol", "NAF", "IA", "Télédétection", "Segmentation"])}</>,
  },
  {
    title: "Date de création",
    child: (
      <>
        <span className={fr.cx("fr-icon-calendar-2-fill", "fr-mr-1w")} />
        <time dateTime="2022-08">Août 2022</time>
      </>
    ),
  },
  {
    title: "Date de révision",
    child: (
      <>
        <span className={fr.cx("fr-icon-calendar-2-fill", "fr-mr-1w")} />
        <time dateTime="2023-04">Avril 2023</time>
      </>
    ),
  },
];

const regionalInfoItem: BlockItem[] = [
  { title: "Emprise géographique", child: "France métropolitaine et DROM-TOM" },
  { title: "Résolution spatiale", child: "20 cm" },
  { title: "Langue", child: "Français" },
];

const technicalInfoItem: BlockItem[] = [
  { title: "Type de représentation géographique", child: "Vecteur" },
  { title: "Formats du fichier", child: "Shapefile, Géopackage, GeoJson" },
  { title: "Encodage du fichier", child: "Unit8" },
  { title: "Encodage des caractères", child: "UTF-8" },
  { title: "Résolution par dalle", child: "2km²" },
  { title: "Lissage vecteur", child: "0,5m" },
  { title: "Nombre de classes", child: "17" },
];

const licenceItem: BlockItem[] = [
  { title: "Licence", child: "Etalab 2.0" },
  { title: "Producteur", child: "IGN - Institut nationale de l’information géographique et forestière" },
  { title: "Référence", child: "URL à pourvoir" },
];

const blocks: Block[] = [
  { title: "Informations générales", children: genericInfoItems },
  { title: "Informations régionales", children: regionalInfoItem },
  { title: "Informations techniques", children: technicalInfoItem },
  { title: "Licence et attributions", children: licenceItem },
];

export const Metadata = () => {
  const { classes } = useStyles();

  const generateBlockItem = (blockItem: BlockItem) => {
    return (
      <Grid item container columnSpacing={3} rowSpacing={1}>
        <Grid item xs={12} md={4}>
          {blockItem.title}
        </Grid>
        <Grid item xs={12} md={8}>
          {blockItem.child}
        </Grid>
      </Grid>
    );
  };

  return (
    <section className={classes.container}>
      <h4>Métadonnées</h4>

      {blocks.map((block, i) => {
        return (
          <div key={block.title}>
            <h6>{block.title}</h6>
            <Grid container rowSpacing={2}>
              {block.children.map((item) => generateBlockItem(item))}
            </Grid>
            {i !== blocks.length - 1 ? <hr className={fr.cx("fr-mt-3w", "fr-mb-1w")} /> : null}
          </div>
        );
      })}
    </section>
  );
};
