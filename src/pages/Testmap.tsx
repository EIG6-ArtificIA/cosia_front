import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import { Geometry } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style, { StyleFunction } from "ol/style/Style";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { makeStyles } from "tss-react/dsfr";
import { Department, getAllDepartments } from "../api/cosiaApi";
import { LoaderOrErrorContainer } from "../components/ui/LoaderOrErrorContainer";
import { useFrenchMap } from "../hooks/useFrenchMap";
import { useToolTipMap } from "../hooks/useTooltipMap";
import { Coordinate } from "ol/coordinate";

const ORIGINAL_CENTER: Coordinate = [6.0, 50.8];
const ORIGINAL_ZOOM = 6.5;

const useStyles = makeStyles()(theme => ({
  container: {
    display: "grid",
    gridTemplateRow: "1fr",
    gridTemplateColumn: "1fr",
    width: "100%",
    height: "100%",
    maxWidth: 800,
    minHeight: 350,
    maxHeight: 800,
  },
  mapContainer: {
    height: "100%",
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.decisions.artwork.motif.grey.default,
    gridColumn: 1,
    gridRow: 1,
  },
  loadingContainer: {
    gridColumn: 1,
    gridRow: 1,
    zIndex: 2,
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
  },
}));

const getFillColorFromStatus = (status: string) => {
  if (status === "available") {
    return "#6A6AF4";
  } else if (status === "soon") {
    return "#E3E3FD";
  }

  return "#EEEEEE";
};

const computeDepartmentFeature = (dep: Department, format: GeoJSON) => {
  const feature = new Feature(dep);
  feature.setGeometry(format.readGeometry(JSON.parse(dep.geomGeojson)));
  return feature;
};

export const Testmap = () => {
  const { classes, cx } = useStyles();
  const [departementFeatures, setdepartementFeatures] = useState<Feature<Geometry>[]>([]);
  const [departmentLayer, setDepartmentLayer] = useState<VectorLayer<VectorSource> | undefined>(
    undefined,
  );

  const {
    isLoading,
    isError,
    data: departments,
    refetch,
  } = useQuery({
    queryKey: ["department"],
    queryFn: () => getAllDepartments(),
    staleTime: 60_000,
  });

  useEffect(() => {
    if (departments === undefined || departments.length === 0) return;
    console.log("useEffect 0");

    const format = new GeoJSON();
    const features: Feature<Geometry>[] = departments.map(dep => computeDepartmentFeature(dep, format));

    setdepartementFeatures(features);
  }, [departments]);

  const setStyle: StyleFunction = useCallback(feature => {
    const status = feature.get("status");
    const fillColor = getFillColorFromStatus(status);
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

    const departmentLayer = new VectorLayer({ source: newSource });
    departmentLayer.setStyle(setStyle);

    map.addLayer(departmentLayer);
    setDepartmentLayer(departmentLayer);
  }, [departementFeatures]);

  const { map } = useFrenchMap("map", ORIGINAL_CENTER);
  useToolTipMap({ map, layer: departmentLayer });

  return (
    <div className={classes.container}>
      {(isLoading || isError) && (
        <div className={cx(classes.mapContainer, classes.loadingContainer)}>
          <LoaderOrErrorContainer isLoading={isLoading} isError={isError} refetch={refetch} />
        </div>
      )}
      <div id="map" className={classes.mapContainer}></div>
    </div>
  );
};
