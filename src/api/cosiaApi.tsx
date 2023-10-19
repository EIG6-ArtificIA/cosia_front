import axios from "axios";

const cosiaApiAxiosInstance = axios.create({
  baseURL: window._env_.API_URL,
  timeout: 15000,
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
