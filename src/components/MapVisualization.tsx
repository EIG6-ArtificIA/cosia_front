import { Box, Grid } from "@mui/material";
import { useMap } from "geocommuns-core";
import { useEffect, useState } from "react";

import { fr } from "@codegouvfr/react-dsfr";
import { makeStyles } from "tss-react/dsfr";
import { City, getCities } from "../api/geoApiGouv";
import { Legend } from "./Legend";
import { OpacitySlider } from "./OpacitySlider";
import TextFieldWithOptions from "./TextFieldWithOptions";

const ORIGINAL_CENTER: [number, number] = [2.5764414841767787, 46.51407673990174];
const ORIGINAL_ZOOM = 5;

const useStyles = makeStyles()((theme) => ({
  block: {
    marginBottom: fr.spacing("4w"),
  },
  mapContainer: {
    height: "100%",
    minHeight: 800,
    maxHeight: 1000,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.decisions.artwork.motif.grey.default,
  },
}));

// TODO : debounce à mettre en place
export const MapVisualization = () => {
  const [inputText, setInputText] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cityPropositions, setCityPropositions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { classes } = useStyles();

  const { setNewCenterAndNewZoom, fitViewToPolygon, setLayerOpacity } = useMap(
    "map",
    ORIGINAL_CENTER,
    ORIGINAL_ZOOM,
    ["ortho", "admin", "aiPrediction"]
  );

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
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box id="map" className={classes.mapContainer} />
        </Grid>

        <Grid item xs={12} md={4}>
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
            <OpacitySlider
              label="Prise de vues aériennes"
              layer="ortho"
              setLayerOpacity={setLayerOpacity}
            />
            <OpacitySlider label="CoSIA" layer="aiPrediction" setLayerOpacity={setLayerOpacity} />
            <OpacitySlider
              label="Limites administratives"
              layer="admin"
              setLayerOpacity={setLayerOpacity}
            />
          </div>

          <Legend />
        </Grid>
      </Grid>
    </Box>
  );
};
