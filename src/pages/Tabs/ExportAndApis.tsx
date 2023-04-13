import { Button } from "@codegouvfr/react-dsfr/Button";
import { Grid } from "@mui/material";
import { makeStyles } from "tss-react/dsfr";
import { Download } from "@codegouvfr/react-dsfr/Download";
import { SLABS_ON_DEMAND } from "../../data/availableSlabs";

const useStyles = makeStyles()((theme) => ({
  contactUs: {
    marginBottom: 32,
  },
  container: {
    maxWidth: 850,
  },
  ftpDetails: {
    color: theme.decisions.text.mention.grey.default,
  },
  vintage: {
    color: theme.decisions.text.mention.grey.default,
    fontSize: 12,
  },
}));

export const ExportAndApis = () => {
  const { classes } = useStyles();
  return (
    <section className={classes.container}>
      <h4>Export & APIs</h4>
      <p>
        L'IGN est en train de produire la donnée CoSIA au cas par cas pour les utilisateurs qui en font
        la demande. Cette démarche a pour but de tester et d'itérer sur la donnée afin de concevoir un
        produit qui répond aux besoins et aux usages des utilisateurs.
      </p>

      <h5>Données de couverture du sol par IA (CoSIA) disponibles</h5>

      <h6>En téléchargement</h6>
      <p>
        <ul>
          <li>
            <Download
              label="40 Landes - Soustons - Millésime 2021"
              linkProps={{ to: "https://filedn.eu/lMasUDxMj4Mfo9XOassyn4b/40/Soustons%202021.zip" }}
              details="ZIP - 74,2 Mo"
            />
          </li>
          <li>
            <Download
              label="37 Indre-et-Loire - Tours Métropole - Millésime 2021"
              linkProps={{ to: "https://filedn.eu/lMasUDxMj4Mfo9XOassyn4b/37/Tours%202021.zip" }}
              details="ZIP - 76,2 Mo"
            />
          </li>
        </ul>
      </p>

      <h6> Via un flux WMS</h6>
      <p>
        <ul>
          <li>
            Fontaines Saint-Martin (69) : https://wxs.ign.fr/5jsuu4l5fobniiv05i5p54uk/geoportail/v/wms?
          </li>
        </ul>
      </p>

      <h6>Dalles à la demande</h6>
      <div className={classes.contactUs}>
        <p>
          Vous êtes intéressé(e) par les données CoSIA ? Contactez-nous pour recevoir les dalles déjà
          disponibles. Emprise de 10km sur 10km maximum avec un délai de 2 semaines minimum.
        </p>

        <ul>
          <Grid container>
            {SLABS_ON_DEMAND.map((slab) => (
              <Grid item key={slab.title} xs={12} sm={6} md={4}>
                <li>
                  {slab.title}
                  <br />
                  <span className={classes.vintage}>Millésime {slab.vintage.join(" & ")}</span>
                </li>
              </Grid>
            ))}
          </Grid>
        </ul>

        <Button iconId="fr-icon-mail-line" linkProps={{ to: "mailto:cosia@ign.fr" }}>
          Nous contacter
        </Button>
      </div>
    </section>
  );
};
