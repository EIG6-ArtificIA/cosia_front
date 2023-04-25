import { fr } from "@codegouvfr/react-dsfr";
import { Box, Grid } from "@mui/material";
import { AvailableLayer, useMap, OpacitySlider } from "geocommuns-core";
import { useEffect, useState } from "react";
import { makeStyles } from "tss-react/dsfr";
import { CallOut } from "@codegouvfr/react-dsfr/CallOut";

import { City, getCities } from "../../api/geoApiGouv";
import { Legend } from "../../components/Legend";
import TextFieldWithOptions from "../../components/TextFieldWithOptions";
import { useConstCallback } from "powerhooks";

const ORIGINAL_CENTER: [number, number] = [4.855906, 45.845433];
const ORIGINAL_ZOOM = 16;

const useStyles = makeStyles()((theme) => ({
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

// TODO : debounce à mettre en place
export const MapVisualization = () => {
  const [inputText, setInputText] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cityPropositions, setCityPropositions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { classes } = useStyles();

  const { setNewCenterAndNewZoom, fitViewToPolygon, setLayerOpacity, setLayerVisibility } = useMap(
    "map",
    ORIGINAL_CENTER,
    ORIGINAL_ZOOM,
    ["ortho", "planIGN", "aiPrediction", "admin"]
  );

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

  useEffect(() => {
    if (inputText.length <= 3 || selectedCity !== null) return;

    setIsLoading(true);
    getCities(inputText)
      .then((res) => {
        setCityPropositions(res.data);
      })
      .catch((e) => console.warn("error " + e))
      .finally(() => setIsLoading(false));
  }, [inputText, selectedCity]);

  useEffect(() => {
    if (selectedCity === null) {
      setNewCenterAndNewZoom(ORIGINAL_CENTER, ORIGINAL_ZOOM);
      return;
    }

    fitViewToPolygon(selectedCity.contour.coordinates);
  }, [selectedCity]);

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
        département du Rhône. D'autres données CoSIA sont disponibles et téléchargeables depuis l'onglet{" "}
        <a href="/info#export-&-apis">Export et APIs</a>.
      </CallOut>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box id="map" className={classes.mapContainer} />
        </Grid>

        <Grid item xs={12} md={4} className={classes.parametersContainer}>
          <div className={classes.block}>
            <h6>Territoire</h6>
            <TextFieldWithOptions<City>
              value={selectedCity}
              setValue={setSelectedCity}
              inputValue={inputText}
              setInputValue={setInputText}
              options={cityPropositions}
              isLoading={isLoading}
              getOptionLabel={(option: City) => {
                const label = option.nom;
                if (option.codesPostaux.length === 1) return label + ", " + option.codesPostaux[0];
                return label;
              }}
            />
          </div>

          <div className={classes.block}>
            <h6>Calques</h6>
            {LAYERS_SETTERS.map((ls) => generateOpacitySlider(ls))}
          </div>

          <Legend />
        </Grid>
      </Grid>
    </Box>
  );
};
