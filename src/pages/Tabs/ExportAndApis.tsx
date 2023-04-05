import { Button } from "@codegouvfr/react-dsfr/Button";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()((theme) => ({
  list: {
    marginBottom: 32,
  },
  contactUs: {
    marginBottom: 32,
  },
  container: {
    maxWidth: 850,
  },
  dataDetails: {
    color: theme.decisions.text.mention.grey.default,
  },
  vintage: {
    color: theme.decisions.text.mention.grey.default,
    fontSize: 12,
  },
  slabsList: {
    display: "flex",
    flexWrap: "wrap",
  },
  slab: {
    flex: 1,
  },
}));

const SLABS_ON_DEMAND = [
  {
    title: "06 Alpes Maritimes",
    vintage: [2017, 2020],
  },
  {
    title: "11 Aude",
    vintage: [2021],
  },
  {
    title: "29 Finistère",
    vintage: [2021],
  },
  {
    title: "33 Gironde",
    vintage: [2021],
  },
  {
    title: "35 Ille-et-Vilaine",
    vintage: [2017, 2020],
  },
  {
    title: "37 Indre-et-Loire",
    vintage: [2021],
  },
  {
    title: "38 Isère",
    vintage: [2018, 2021],
  },
  {
    title: "40 Landes",
    vintage: [2018, 2021],
  },
  {
    title: "62 Pas-de-Calais",
    vintage: [2018, 2021],
  },
  {
    title: "66 Pyrénées-Orientales",
    vintage: [2021],
  },
  {
    title: "67 Bas-Rhin",
    vintage: [2018, 2021],
  },
  {
    title: "69 Rhône",
    vintage: [2017, 2020],
  },
  {
    title: "75 Paris",
    vintage: [2021],
  },
  {
    title: "78 Yvelines",
    vintage: [2021],
  },
  {
    title: "83 Var",
    vintage: [2017, 2020],
  },
  {
    title: "84 Vaucluse",
    vintage: [2021],
  },
  {
    title: "91 Essone",
    vintage: [2018, 2021],
  },
  {
    title: "92 Hauts-de-Seine",
    vintage: [2021],
  },
  {
    title: "93 Seine-Saint-Denis",
    vintage: [2021],
  },
  {
    title: "94 Val-de-Marne",
    vintage: [2021],
  },
  {
    title: "95 Val-d'Oise",
    vintage: [2018, 2021],
  },
];

export const ExportAndApis = () => {
  const { classes } = useStyles();
  return (
    <section className={classes.container}>
      <h4>Export & APIs</h4>
      <p>
        L'IGN est en train de produire la donnée CoSIA au cas par cas pour les utilisateurs qui en font
        la demande. Cette démarche a pour but de tester et d'itérer sur la donnée afin de concevoir un
        produit qui répond aux besoins et aux usages des utilisateurs.
        <br />
        Les données déjà disponibles sont :
      </p>

      <h6>Dalles disponibles</h6>
      <p>Télécharger directement les données CoSIA :</p>
      <ul className={classes.list}>
        <li>
          37 Indre-et-Loire - Tours Métropole - Millésime 2021
          <br />
          <span className={classes.dataDetails}>Lien : </span>{" "}
          <a
            title="lien de téléchargement France Transfert des données de Tours Métropole"
            target="_blank"
            rel="noopener"
            href="https://francetransfert.numerique.gouv.fr/download/?enclosure=5e1439e2-45c7-4c84-9194-44ee14c114c8&recipient=Ym9yaXMud2F0dHJlbG9zQGdtYWlsLmNvbQ==&token=29a59bef-e53e-401f-a8c5-a5303ea40f47&lang=fr-FR"
          >
            COSIA_37_2021_Tours
          </a>
          <br />
          <span className={classes.dataDetails}>Mot de passe : USp:4^%2hMy0W1R#8XS</span>
        </li>
        <li>
          40 Landes - Communes d'Azure, Soustons, Messanges, Seignosse et Vieux-Boucau-les-Bains -
          Millésime 2021
          <br />
          <span className={classes.dataDetails}>Lien :</span>
          <a
            title="lien de téléchargement France Transfert des données des Landes"
            target="_blank"
            rel="noopener"
            href=""
          >
            Cosia_40_2021_MACS
          </a>
          <br />
          <span className={classes.dataDetails}>Mot de passe : </span>
        </li>
      </ul>

      <h6>Dalles à la demande</h6>

      <div className={classes.contactUs}>
        <p>
          Vous êtes intéressé(e) par les données CoSIA ? Contactez-nous pour recevoir les dalles déjà
          disponibles.
        </p>
        <ul>
          {SLABS_ON_DEMAND.map((slab) => (
            <li key={slab.title} className={classes.slab}>
              {slab.title}
              <br />
              <span className={classes.vintage}>Millésime {slab.vintage.join(" & ")}</span>
            </li>
          ))}
        </ul>
        <Button iconId="fr-icon-mail-line" linkProps={{ to: "mailto:cosia@ign.fr" }}>
          Nous contacter
        </Button>
      </div>
    </section>
  );
};
