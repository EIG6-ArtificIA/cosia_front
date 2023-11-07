import { Map, MapBrowserEvent } from "ol";
import { FeatureLike } from "ol/Feature";
import { Point } from "ol/geom";
import Fill from "ol/style/Fill";
import RegularShape from "ol/style/RegularShape";
import Style from "ol/style/Style";
import Text from "ol/style/Text";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
  map?: Map;
};

export const useToolTipMap = ({ map }: Props) => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureLike | undefined>(undefined);

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

  const getSetTooltip = useCallback(
    (map: Map) => (e: MapBrowserEvent<any>) => {
      if (map === undefined) return;

      if (selectedFeature !== undefined) {
        // selectedFeature.setStyle(undefined);
        setSelectedFeature(undefined);
      }

      map.forEachFeatureAtPixel(e.pixel, (f: FeatureLike) => {
        setSelectedFeature(f);
        // selectStyle.getFill().setColor(f.get("COLOR") || "#eeeeee");
        const tooltipGeometry = tooltip.getGeometry() as Point;
        console.log(e.coordinate);
        tooltipGeometry.setCoordinates(e.coordinate);
        tooltip.getText().setText(f.get("name"));
        console.log(f.get("name"));

        // f.setStyle(selectStyles);
        return true;
      });
    },
    [map, selectedFeature],
  );

  useEffect(() => {
    if (map === undefined) return;
    const setTooltip = getSetTooltip(map);
    map.on("pointermove", setTooltip);
    return map.un("pointermove", setTooltip);
  }, [map, selectedFeature]);
};
