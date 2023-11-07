import { makeStyles } from "tss-react/dsfr";
import { useFrenchMap } from "../hooks/useFrenchMap";
import { useQuery } from "react-query";
import { Department, getAllDepartments } from "../api/cosiaApi";
import { useCallback, useEffect, useState } from "react";
import GeoJSON from "ol/format/GeoJSON";
import Feature, { FeatureLike } from "ol/Feature";
import { Geometry, MultiPolygon, Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style, { StyleFunction, StyleLike } from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import { MapBrowserEvent, MapEvent, Overlay } from "ol";
import Text from "ol/style/Text";
import RegularShape from "ol/style/RegularShape";
import { useToolTipMap } from "../hooks/useTooltipMap";

const ORIGINAL_CENTER: [number, number] = [4.8, 50.8];
const ORIGINAL_ZOOM = 6.5;

const useStyles = makeStyles()(theme => ({
  mapContainer: {
    height: "100%",
    minHeight: 700,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.decisions.artwork.motif.grey.default,
  },
}));

export const Testmap = () => {
  const { classes } = useStyles();
  const [departementFeatures, setdepartementFeatures] = useState<Feature<Geometry>[]>([]);
  const [departementSource, setDepartementSource] = useState<VectorSource | undefined>(undefined);
  const [selectedFeature, setSelectedFeature] = useState<FeatureLike | undefined>(undefined);
  const {
    // isLoading,
    // isError,
    data: departments,
    // refetch,
  } = useQuery({
    queryKey: ["department"],
    queryFn: () => getAllDepartments(),
    staleTime: 60_000,
  });

  useEffect(() => {
    if (departments === undefined || departments.length === 0) return;
    const format = new GeoJSON();

    const features: Feature<Geometry>[] = departments.map(dep => {
      const feature = new Feature(dep);
      feature.setGeometry(format.readGeometry(JSON.parse(dep.geomGeojson)));
      return feature;
    });
    setdepartementFeatures(features);
  }, [departments]);

  const setStyle: StyleFunction = useCallback(feature => {
    let fillColor;
    const status = feature.get("status");
    if (status === "available") {
      fillColor = "#6A6AF4";
    } else if (status === "soon") {
      fillColor = "#E3E3FD";
    } else {
      fillColor = "#EEEEEE";
    }
    return new Style({
      stroke: new Stroke({
        color: "#FFF",
        width: 1,
      }),
      fill: new Fill({
        color: fillColor,
      }),
    });
  }, []);

  useEffect(() => {
    if (departementFeatures.length === 0) return;
    if (map === undefined) return;
    const newSource = new VectorSource({
      features: departementFeatures,
    });
    setDepartementSource(newSource);

    const departmentLayer = new VectorLayer({ source: newSource });
    departmentLayer.setStyle(setStyle);

    map.addLayer(departmentLayer);
  }, [departementFeatures]);

  const { isLoading: isMapLoading, map } = useFrenchMap("map", ORIGINAL_CENTER, ORIGINAL_ZOOM);
  useToolTipMap({ map });

  return (
    <div>
      <div id="map" className={classes.mapContainer} />
    </div>
  );
};
