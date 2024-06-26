import { fr } from "@codegouvfr/react-dsfr";
import { makeStyles } from "tss-react/dsfr";
import { Doc, MemoizedDownladLink as DownloadLink } from "../../components/ui/DownloadLink";
import { Grid, Box } from "@mui/material";
import { MemoMediaCard as MediaCard } from "../../components/ui/MediaCard";
import { IgnCard } from "../../components/IgnCard";

const useStyles = makeStyles()(theme => ({
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
}));

const DOCS: (Doc & { icon?: string })[] = [
  { name: "Description", link: "/pdf/Cosia_Descriptif_IGN_2023.pdf", size: "1,2 Mo" },
  { name: "Nomenclature des classes", link: "/pdf/Cosia_Nomenclature_IGN_2023.pdf", size: "0,9 Mo" },
  {
    name: "Documentation technique",
    link: "/pdf/Cosia_Documentation_Technique_IGN_2023.pdf",
    size: "7,1 Mo",
  },
  {
    name: "Comparatif CoSIA et OCSGE",
    link: "/pdf/Comparatif_OCSGE_CoSIA_IGN_2023.pdf",
    size: "1,9 Mo",
  },
  {
    name: "Github Flair",
    link: "https://ignf.github.io/FLAIR/index_fr.html",
    icon: "ri-github-fill",
  },
];

const VIDEOS = [
  {
    name: "CoSIA, la Couverture du Sol par Intelligence Artificielle",
    tag: "Communication",
    date: "A venir",
    link: "",
  },
  {
    name: "Découvrez CoSIA, la Couverture du Sol par Intelligence Artificielle",
    tag: "Conférence en ligne",
    date: "11 oct. 2023",
    link: "https://www.youtube.com/embed/kDFb8cTWa1s",
  },
  {
    name: "Intelligence artificielle pour la description de la couverture des sols",
    tag: "Conférence en ligne",
    date: "28 sept. 2023",
    link: "https://www.youtube.com/embed/g1N1PL8j4MY?si=irzy6Ar9AQJdN2hM",
  },
  {
    name: "Les données IA au service de l’occupation du sol – 30 juin 2022",
    tag: "Conférence en ligne",
    date: "4 juil. 2022",
    link: "https://www.youtube.com/embed/Vw-MsVNHyW4?si=Mw-dNbb82-hGGY5P",
  },
];

export const GenericInfo = () => {
  const { classes } = useStyles();
  const generateSubtitle = (text: string) => (
    <p className={classes.subtitle}>
      <b>{text}</b>
    </p>
  );

  const textInfo = (
    <>
      {generateSubtitle("Descriptif")}
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

  return (
    <>
      <Grid container columnSpacing={{ md: 10 }}>
        <Grid item md={12} lg>
          <h4>Informations</h4>
          {textInfo}
        </Grid>
        <Box component={Grid} item xs={12} display={{ xs: "block", lg: "none" }}>
          <hr />
        </Box>
        <Grid item xs={12} lg={5}>
          {generateSubtitle("Producteur")}
          <IgnCard />
          <hr />
          {generateSubtitle("Territoire")}
          <p>France Métropolitaine et DROM</p>
          <hr />
          {generateSubtitle("Millésimes")}
          <p>2017-2022</p>
        </Grid>
      </Grid>

      <hr />

      {generateSubtitle("Ressources")}
      {DOCS.map(doc => (
        <DownloadLink doc={doc} key={doc.name} icon={doc.icon} />
      ))}

      <hr className={fr.cx("fr-mt-4w")} />

      {generateSubtitle("Ressources vidéos")}
      <Grid container spacing={4}>
        {VIDEOS.map(video => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <MediaCard {...video} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
