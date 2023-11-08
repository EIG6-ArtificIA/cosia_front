import { Map, MapBrowserEvent } from "ol";
import Feature from "ol/Feature";
import { Geometry, Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Fill from "ol/style/Fill";
import RegularShape from "ol/style/RegularShape";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import Text from "ol/style/Text";
import { useConstCallback } from "powerhooks";
import { useEffect, useMemo, useState } from "react";

type Props = {
  layer?: VectorLayer<VectorSource>;
  map?: Map;
};

export const useToolTipMap = ({ layer, map }: Props) => {
  const [selectedDepartmentNumber, setSelectedDepartmentNumber] = useState<number | undefined>(
    undefined,
  );

  const selectStyle = useMemo(() => {
    return new Style({
      stroke: new Stroke({
        color: "#FFF",
        width: 4,
      }),
    });
  }, []);

  const tooltip = useMemo(() => {
    return new Style({
      text: new Text({
        font: "14px Calibri,sans-serif",
        fill: new Fill({
          color: "rgba(255, 255, 255, 1)",
        }),
        backgroundFill: new Fill({
          color: "rgba(0, 0, 0, 0.7)",
        }),
        padding: [3, 3, 3, 3],
        textBaseline: "bottom",
        offsetY: -15,
      }),
      image: new RegularShape({
        radius: 8,
        points: 3,
        angle: Math.PI,
        displacement: [0, 10],
        fill: new Fill({
          color: "rgba(0, 0, 0, 0.7)",
        }),
      }),
      geometry: new Point([]),
    });
  }, []);

  const selectStyles = useMemo(() => [selectStyle, tooltip], [selectStyle, tooltip]);

  const featureOverlay = useMemo(
    () =>
      map
        ? new VectorLayer({
            source: new VectorSource(),
            map,
          })
        : undefined,
    [map],
  );

  const displayFeatureInfo = useConstCallback((event: MapBrowserEvent<any>) => {
    if (layer === undefined) return;
    if (featureOverlay === undefined) return;
    const featureOverlaySource = featureOverlay.getSource();
    if (featureOverlaySource === null) return;

    layer.getFeatures(event.pixel).then(features => {
      const featureLike = features.length ? features[0] : undefined;
      if (featureLike === undefined) {
        featureOverlaySource.clear();
        setSelectedDepartmentNumber(undefined);
        return;
      }

      const featureProperties = featureLike.getProperties();
      const featureDepartmentNumber = featureProperties["number"];

      const feature = new Feature({
        geometry: featureLike.getGeometry() as Geometry,
        ...featureLike.getProperties(),
      });

      if (featureDepartmentNumber !== selectedDepartmentNumber) {
        featureOverlaySource.clear();
        if (feature) featureOverlaySource.addFeature(feature);
        setSelectedDepartmentNumber(featureDepartmentNumber);
        featureOverlay.changed();

        const tooltipGeometry = tooltip.getGeometry() as Point;
        const departmentCentroid = JSON.parse(featureProperties["centroidGeojson"]);
        tooltipGeometry.setCoordinates(departmentCentroid["coordinates"]);

        const text = `${featureDepartmentNumber} - ${featureProperties["name"]}`;
        tooltip.getText().setText(text);

        feature.setStyle(selectStyles);
      }
    });
  });

  useEffect(() => {
    if (map === undefined) return;
    map.on("pointermove", event => displayFeatureInfo(event));
    return map.un("pointermove", displayFeatureInfo);
  }, [map, displayFeatureInfo]);
};
