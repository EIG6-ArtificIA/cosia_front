import { Map, MapBrowserEvent } from "ol";
import Feature, { FeatureLike } from "ol/Feature";
import { Geometry, Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Fill from "ol/style/Fill";
import RegularShape from "ol/style/RegularShape";
import Style from "ol/style/Style";
import Text from "ol/style/Text";
import { useConstCallback } from "powerhooks";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
  layer?: VectorLayer<VectorSource>;
  map?: Map;
};

export const useToolTipMap = ({ layer, map }: Props) => {
  const [selectedDepartmentNumber, setSelectedDepartmentNumber] = useState<number | undefined>(
    undefined,
  );

  const selectStyle = useMemo(() => {
    new Style({
      fill: new Fill({
        color: "#eeeeee",
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

  const selectStyles = [selectStyle, tooltip];

  // const getSetTooltip = useCallback(
  //   (map: Map) => (e: MapBrowserEvent<any>) => {
  //     if (map === undefined) return;

  //     if (selectedFeature !== undefined) {
  //       // selectedFeature.setStyle(undefined);
  //       setSelectedFeature(undefined);
  //     }

  //     map.forEachFeatureAtPixel(e.pixel, (f: FeatureLike) => {
  //       setSelectedFeature(f);
  //       // selectStyle.getFill().setColor(f.get("COLOR") || "#eeeeee");
  //       const tooltipGeometry = tooltip.getGeometry() as Point;
  //       console.log(e.coordinate);
  //       tooltipGeometry.setCoordinates(e.coordinate);
  //       tooltip.getText().setText(f.get("name"));
  //       console.log(f.get("name"));

  //       // f.setStyle(selectStyles);
  //       return true;
  //     });
  //   },
  //   [map, selectedFeature],
  // );

  const featureOverlay = useMemo(
    () =>
      map
        ? new VectorLayer({
            source: new VectorSource(),
            map: map,
            style: {
              "stroke-color": "rgba(255, 255, 255, 0.7)",
              "stroke-width": 4,
            },
          })
        : undefined,
    [map],
  );

  // console.log(selectedFeature);

  const displayFeatureInfo = useConstCallback((event: MapBrowserEvent<any>) => {
    console.log("coucou");
    if (featureOverlay === undefined) return;
    if (layer === undefined) return;
    layer.getFeatures(event.pixel).then(features => {
      const featureLike = features.length ? features[0] : undefined;
      if (featureLike === undefined) return;

      const featureDepartmentNumber = featureLike.getProperties()["number"];

      const feature = new Feature({
        geometry: featureLike.getGeometry() as Geometry,
        ...featureLike.getProperties(),
      });

      /* const info = document.getElementById('info');
    if info
    if (features.length) {
      info.innerHTML = feature.get('ECO_NAME') + ': ' + feature.get('NNH_NAME');
    } else {
      info.innerHTML = '&nbsp;';
    } */
      const featureOverlaySource = featureOverlay.getSource();
      if (featureOverlaySource === null) return;

      console.log("Chirac");
      console.log(featureDepartmentNumber);
      console.log(selectedDepartmentNumber);
      console.log(feature);
      console.log(featureOverlaySource.getFeatures());

      if (featureDepartmentNumber !== selectedDepartmentNumber) {
        featureOverlaySource.clear();
        if (feature) featureOverlaySource.addFeature(feature);
        setSelectedDepartmentNumber(featureDepartmentNumber);
        featureOverlay.changed();
      }
    });
  });

  useEffect(() => {
    if (map === undefined) return;
    map.on("pointermove", event => displayFeatureInfo(event));
    return map.un("pointermove", displayFeatureInfo);
  }, [map, displayFeatureInfo]);
};
