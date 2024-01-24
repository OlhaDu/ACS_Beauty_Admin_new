import axios from "axios";

const { VITE_API_BASE_URL, VITE_API_AUTH_TOKEN } = import.meta.env;

export const instance = axios.create({
  baseURL: VITE_API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  config.headers!.authorization = `Bearer ${VITE_API_AUTH_TOKEN}`;
  return config;
});
