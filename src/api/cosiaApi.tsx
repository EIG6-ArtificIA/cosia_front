import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

const cosiaApiAxiosInstance = applyCaseMiddleware(
  axios.create({
    baseURL: window._env_.API_URL,
    timeout: 15000,
  }),
);

export type Department = {
  name: string;
  number: string;
  status: string;
  geom: string;
};

export const getAllDepartments = (): Promise<{ data: Department[] }> => {
  return cosiaApiAxiosInstance.get("departments");
};

type DepartmentDataResponse = {
  id: string;
  year: number;
  downloadLink: string;
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

export const getAllDepartmentData = (): Promise<DepartmentData[]> => {
  return cosiaApiAxiosInstance.get("department-data").then((res: { data: DepartmentDataResponse[] }) => {
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
  department_data: string;
};

type DepartmentDataDownload = DepartementDataDownloadPayload;

export const createDepartementDataDownload = (
  payload: DepartementDataDownloadPayload,
): Promise<{ data: DepartmentDataDownload }> => {
  return cosiaApiAxiosInstance.post("department-data-downloads/", payload);
};
