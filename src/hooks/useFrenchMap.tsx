import { fr } from "@codegouvfr/react-dsfr";
import { Map, View } from "ol";
import BaseLayer from "ol/layer/Base";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import { useEffect, useMemo, useState } from "react";
import { makeStyles } from "tss-react/dsfr";

import { useIsMapLoading } from "geocommuns-core/hooks/useIsMapLoading";
import { createFullScreenController } from "geocommuns-core/map/controllers";
import { Control } from "ol/control";
import TileLayer from "ol/layer/Tile";
import WMTS from "ol/source/WMTS";

// const lightTheme = fr.getColors(false);

// const useStyles = makeStyles({ name: "Map" })({
//   fullScreenContainer: {
//     position: "absolute",
//     display: "flex",
//     flexDirection: "row",
//     height: "100%",
//     bottom: 0,
//     right: 0,
//     backgroundColor: "transparent",
//     "&& > button": {
//       height: fr.spacing("5w"),
//       width: fr.spacing("5w"),
//       fontSize: "large",
//       color: lightTheme.decisions.background.actionHigh.blueFrance.default,
//       margin: fr.spacing("2w"),
//       "&:hover": {
//         outline: "none",
//       },
//     },
//   },
//   inactivateFullScreen: {
//     alignSelf: "flex-end",
//   },
// });

export const useFrenchMap = (target: string, center: [number, number], zoom: number) => {
  // const { classes, cx } = useStyles();
  const [map, setMap] = useState<Map | undefined>(undefined);
  const { isLoading } = useIsMapLoading(map);

  const view = useMemo(
    () =>
      new View({
        zoom,
        center: fromLonLat(center),
      }),
    [zoom, center],
  );

  /* const fullScreenController = useMemo(
    () =>
      createFullScreenController({
        className: classes.fullScreenContainer,
        inactiveClassName: cx("fr-btn fr-btn--secondary", classes.inactivateFullScreen),
      }),
    [classes],
  );

  const controls = useMemo(() => {
    const controlsList: Control[] = [fullScreenController];

    return controlsList;
  }, [fullScreenController]); */

  useEffect(() => {
    const map = new Map({
      target,
      view,
      // controls,
    });

    setMap(map);

    return () => map.setTarget(undefined);
  }, []);

  return { isLoading, map };
};
