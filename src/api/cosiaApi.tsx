import axios from "axios";

const cosiaApiAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1500,
});

export type Department = {
  name: string;
  number: string;
  status: string;
  geom: string;
};

export const getAllDepartments = (): Promise<{ data: Department[] }> => {
  return cosiaApiAxiosInstance.get("departments");
};

const cosiaApiAxiosInstanceAvecHttps = axios.create({
  baseURL: process.env.REACT_APP_API_URL_AVEC_HTTPS,
  timeout: 1500,
});

export const getAllDepartmentsAvecHttps = (): Promise<{ data: Department[] }> => {
  return cosiaApiAxiosInstanceAvecHttps.get("departments");
};

const cosiaApiAxiosInstanceSansCosiaAvecHttps = axios.create({
  baseURL: process.env.REACT_APP_API_URL_SANS_COSIA_AVEC_HTTPS,
  timeout: 1500,
});

export const getAllDepartmentsSansCosiaAvecHttps = (): Promise<{ data: Department[] }> => {
  return cosiaApiAxiosInstanceSansCosiaAvecHttps.get("departments");
};

const cosiaApiAxiosInstanceSansCosia = axios.create({
  baseURL: process.env.REACT_APP_API_URL_SANS_COSIA,
  timeout: 1500,
});

export const getAllDepartmentsSansCosia = (): Promise<{ data: Department[] }> => {
  return cosiaApiAxiosInstanceSansCosia.get("departments");
};
