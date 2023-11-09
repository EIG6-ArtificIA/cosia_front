import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import { useEffect, useMemo, useState } from "react";

const MIN_ZOOM = 4;
const MAX_ZOOM = 12;
const MAX_EXTENT = [...fromLonLat([-3.2, 45.8]), ...fromLonLat([15.8, 55.8])];

export const useMap = (target: string, minZoom = MIN_ZOOM, maxZoom = MAX_ZOOM, extent = MAX_EXTENT) => {
  const [map, setMap] = useState<Map | undefined>(undefined);

  const view = useMemo(() => new View({ minZoom, maxZoom, extent }), []);

  useEffect(() => {
    const map = new Map({
      target,
      view,
    });

    setMap(map);

    return () => map.setTarget(undefined);
  }, []);

  return { map };
};
