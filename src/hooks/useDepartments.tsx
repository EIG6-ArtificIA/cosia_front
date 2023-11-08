import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import { Geometry } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style, { StyleFunction } from "ol/style/Style";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getAllDepartments } from "../api/cosiaApi";
import {
  computeDepartmentFeature,
  getAllDepartmentsExtent,
  getFillColorFromStatus,
} from "../utils/departments";

export const useDepartments = () => {
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

  const departmentsExtent = useMemo(
    () => getAllDepartmentsExtent(departementFeatures),
    [departementFeatures],
  );

  useEffect(() => {
    if (departments === undefined || departments.length === 0) return;

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

    const newSource = new VectorSource({
      features: departementFeatures,
    });

    const departmentLayer = new VectorLayer({ source: newSource });
    departmentLayer.setStyle(setStyle);

    setDepartmentLayer(departmentLayer);
  }, [departementFeatures]);

  return { isLoading, isError, refetch, departmentLayer, departmentsExtent };
};
