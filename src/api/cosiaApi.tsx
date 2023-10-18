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
