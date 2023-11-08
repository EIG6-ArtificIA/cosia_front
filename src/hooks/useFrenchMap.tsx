import { Map, View } from "ol";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import { useEffect, useMemo, useState } from "react";

import { useIsMapLoading } from "geocommuns-core/hooks/useIsMapLoading";
import { Coordinate } from "ol/coordinate";
import { useMediaQuery, useTheme } from "@mui/material";

export const useFrenchMap = (
  target: string,
  center: Coordinate,
  maxZoom = 12,
  extent = [...fromLonLat([-1.2, 45.8]), ...fromLonLat([12.8, 55.8])],
) => {
  const [map, setMap] = useState<Map | undefined>(undefined);
  const { isLoading } = useIsMapLoading(map);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const zoom = useMemo(() => {
    if (isSmallScreen) return 5.2;
    if (isMediumScreen) return 6;
    return 6.5;
  }, [isSmallScreen, isMediumScreen]);

  const view = useMemo(
    () =>
      new View({
        zoom,
        minZoom: zoom,
        maxZoom,
        center: fromLonLat(center),
        extent,
      }),
    [zoom, center],
  );

  useEffect(() => {
    const map = new Map({
      target,
      view,
    });

    setMap(map);

    return () => map.setTarget(undefined);
  }, []);

  return { isLoading, map };
};
