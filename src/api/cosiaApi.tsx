import axios from "axios";

const cosiaApiAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1500,
});
