import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { getCookie } from "../utils/utils";

const cosiaApiAxiosInstance = applyCaseMiddleware(
  axios.create({
    baseURL: window._env_.API_URL,
    timeout: 15000,
  }),
);

export enum DepartmentStatus {
  Available = "available",
  Soon = "soon",
  NotAvailable = "not_available",
}

export type Department = {
  name: string;
  number: string;
  status: DepartmentStatus;
  geomGeojson: string;
  centroidGeojson: string;
};

export const getAllDepartments = (): Promise<Department[]> => {
  return cosiaApiAxiosInstance.get("departments").then((res: { data: Department[] }) => res.data);
};

type DepartmentDataResponse = {
  id: string;
  year: number;
  department: {
    number: string;
    name: string;
  };
  fileSize: string;
  zipSize: string;
};

export type DepartmentData = DepartmentDataResponse & {
  label: string;
};

// TODO remove ?only_with_s3_object_name once front is deployed on prod
export const getAllDepartmentData = (): Promise<DepartmentData[]> => {
  return cosiaApiAxiosInstance
    .get("department-data?only_with_s3_object_name")
    .then((res: { data: DepartmentDataResponse[] }) => {
      return res.data.map(depData => {
        return {
          ...depData,
          label: `${depData.department.number} - ${depData.department.name} - ${depData.year}`,
        };
      });
    });
};

export type DepartementDataDownloadPayload = {
  username: string;
  email: string;
  organization: string;
  departmentData: string;
};

type DepartmentDataDownload = DepartementDataDownloadPayload & {
  departmentData: DepartmentDataResponse & {
    s3DownloadUrl: string;
  };
};

const getPostRequestConfig = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") return {};
  const csrftoken = getCookie("csrftoken");
  return {
    headers: {
      "content-type": "application/json",
      "X-CSRFToken": csrftoken,
    },
  };
};

export const createDepartementDataDownload = (
  payload: DepartementDataDownloadPayload,
): Promise<DepartmentDataDownload> => {
  const config = getPostRequestConfig();
  return cosiaApiAxiosInstance.post("department-data-downloads/", payload, config).then(res => res.data);
};
