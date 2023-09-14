import axios from "axios";

// TODO move type into own file
export type Territory = {
  name: string;
  geom: string;
  status: string;
};

const geoApiAxiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 1500,
});

export const getTerritories = (): Promise<{ data: Territory[] }> => {
  return geoApiAxiosInstance.get("territories");
};
