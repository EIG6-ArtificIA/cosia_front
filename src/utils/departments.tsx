import Feature from "ol/Feature";
import { createEmpty, extend } from "ol/extent";
import GeoJSON from "ol/format/GeoJSON";
import { Geometry } from "ol/geom";
import { Department, DepartmentStatus } from "../api/cosiaApi";

export const getFillColorFromStatus = (status: DepartmentStatus) => {
  if (status === DepartmentStatus.Available) {
    return "#6A6AF4";
  } else if (status === DepartmentStatus.Soon) {
    return "#E3E3FD";
  }

  return "#EEEEEE";
};

export const getAllDepartmentsExtent = (departmentFeatures: Feature<Geometry>[]) => {
  if (departmentFeatures.length === 0) return undefined;
  const currentExtent = createEmpty();

  departmentFeatures.forEach(dep => {
    const depGeometry = dep.getGeometry();
    if (depGeometry === undefined) return;
    const depExtent = depGeometry.getExtent();
    // map_json_data[county_id]['google_map_county_polygon'].getGeometry().transform('EPSG:4326', 'EPSG:3857');
    extend(currentExtent, depExtent);
  });
  return currentExtent;
};

export const computeDepartmentFeature = (dep: Department, format: GeoJSON) => {
  const feature = new Feature(dep);
  feature.setGeometry(format.readGeometry(JSON.parse(dep.geomGeojson)));
  return feature;
};
