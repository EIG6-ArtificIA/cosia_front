import { fr } from "@codegouvfr/react-dsfr";
import { Divider, Grid } from "@mui/material";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()((theme) => ({
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    color: theme.decisions.text.title.blueFrance.default,
    marginBottom: fr.spacing("1v"),
  },
  infoContainer: {
    marginBottom: 0,
  },
  infoItem: {
    marginBottom: fr.spacing("1v"),
  },
  icon: {
    marginRight: fr.spacing("1w"),
  },
}));

export const InfoBlock = () => {
  const { classes } = useStyles();
  const dataName = "CoSIA";
  const dataDescription = "Couverture du Sol par Intelligence Artificielle";

  return (
    <Grid container justifyContent="space-between" flexDirection="column">
      <Grid item className={classes.titleContainer}>
        <h1 className={classes.title}>{dataName}</h1>
        <div>
          <b>{dataDescription}</b>
        </div>
      </Grid>

      <Grid item className={classes.infoContainer}>
        <div className={classes.infoItem}>Producteur : IGN</div>

        <Grid
          container
          columnSpacing={fr.spacing("3v")}
          rowSpacing={fr.spacing("1v")}
          mb={fr.spacing("1v")}
        >
          <Grid item xs={12} sm="auto">
            Création : <time dateTime="2023-04-04">04 avril 2023</time>
          </Grid>
          <Grid item xs={0} sm="auto" sx={{ display: { xs: "none", sm: "block" } }}>
            <Divider orientation="vertical" />
          </Grid>
          <Grid item xs={12} sm="auto">
            Mise à jour : <time dateTime="2023-04-25">25 avril 2023</time>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
