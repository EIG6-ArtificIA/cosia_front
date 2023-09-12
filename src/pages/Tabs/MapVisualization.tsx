import { fr } from "@codegouvfr/react-dsfr";
import { Box, CircularProgress, Grid } from "@mui/material";
import { AvailableLayer, useMap, OpacitySlider } from "geocommuns-core";
import { makeStyles } from "tss-react/dsfr";
import { CallOut } from "@codegouvfr/react-dsfr/CallOut";

import { Legend } from "../../components/Legend";
import { useConstCallback } from "powerhooks";
import { Link } from "react-router-dom";
import { RENNES_POLYGON } from "../../data/rennesPolygon";
import Button from "@codegouvfr/react-dsfr/Button";

const ORIGINAL_CENTER: [number, number] = [-1.677, 48.1];
const ORIGINAL_ZOOM = 14;

const useStyles = makeStyles()(theme => ({
  block: {
    marginBottom: fr.spacing("4w"),
  },
  mapContainer: {
    height: "100%",
    minHeight: 500,
    maxHeight: 640,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.decisions.artwork.motif.grey.default,
  },
  parametersContainer: {
    [fr.breakpoints.up("md")]: {
      minHeight: 500,
      maxHeight: 640,
      overflowY: "scroll",
    },
  },
  sliderOpacity: {
    marginBottom: fr.spacing("3v"),
  },
  loader: {
    position: "absolute",
  },
  layerTitle: {
    alignItems: "center",
    display: "flex",
    gap: 10,
  },
}));

type LayerSetter = {
  label: string;
  layer: AvailableLayer;
  defaultVisibility: boolean;
  defaultOpacity: number;
};

const LAYERS_SETTERS: LayerSetter[] = [
  { label: "Limites administratives", layer: "admin", defaultVisibility: true, defaultOpacity: 100 },
  { label: "CoSIA", layer: "aiPrediction", defaultVisibility: true, defaultOpacity: 70 },
  { label: "Plan IGN", layer: "planIGN", defaultVisibility: false, defaultOpacity: 100 },
  { label: "Prise de vues aériennes", layer: "ortho", defaultVisibility: true, defaultOpacity: 100 },
];

const RENNES_TERRITORY = {
  name: "Rennes",
  polygon: RENNES_POLYGON.contour.coordinates,
};

export const MapVisualization = () => {
  const { classes } = useStyles();

  const {
    fitViewToPolygon,
    setLayerOpacity,
    setLayerVisibility,
    isLoading: isMapLoading,
  } = useMap("map", ORIGINAL_CENTER, ORIGINAL_ZOOM, ["ortho", "planIGN", "aiPrediction", "admin"]);

  const generateOpacitySlider = useConstCallback((ls: LayerSetter) => {
    const setCurrentLayerOpacity = (opacity: number): void => {
      setLayerOpacity(ls.layer, opacity);
    };

    const setCurrentLayerVisibility = (visibility: boolean): void => {
      setLayerVisibility(ls.layer, visibility);
    };

    return (
      <OpacitySlider
        key={ls.layer}
        label={ls.label}
        setLayerOpacity={setCurrentLayerOpacity}
        setLayerVisibility={setCurrentLayerVisibility}
        className={classes.sliderOpacity}
        defaultVisibility={ls.defaultVisibility}
        defaultOpacity={ls.defaultOpacity}
        maxWidth={250}
      />
    );
  });

  const onTerritoryClick = (coordinates: typeof RENNES_TERRITORY.polygon) => {
    fitViewToPolygon(coordinates);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CallOut colorVariant="brown-caramel">
        <span className={fr.cx("fr-icon-info-line")} /> Les données affichées ont été produites pour le
        pays de Rennes. D'autres données CoSIA sont disponibles et téléchargeables depuis l'onglet{" "}
        <Link to="/info#export-&-apis">Export et APIs</Link>.
      </CallOut>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box id="map" className={classes.mapContainer} />
        </Grid>

        <Grid item xs={12} md={4} className={classes.parametersContainer}>
          <div className={classes.block}>
            <h6 className={fr.cx("fr-mb-1w")}>Territoire</h6>
            <Button onClick={() => onTerritoryClick(RENNES_POLYGON.contour.coordinates)}>
              {RENNES_TERRITORY.name}
            </Button>
            <p className={fr.cx("fr-mt-1w")}>
              D'autres données de visualisation sont en cours de production.
            </p>
          </div>

          <div className={classes.block}>
            <h6 className={classes.layerTitle}>
              Calques {isMapLoading && <CircularProgress size={20} />}
            </h6>
            {LAYERS_SETTERS.map(ls => generateOpacitySlider(ls))}
          </div>

          <Legend />
        </Grid>
      </Grid>
    </Box>
  );
};
