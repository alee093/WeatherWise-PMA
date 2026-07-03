import axios from "axios";
import { getClientId } from "../utils/clientId";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  config.headers["x-client-id"] = getClientId();

  return config;
});

export const getWeather = async (city, lat, lon) => {
  const response = await api.get("/weather", {
    params: {
      city: city || undefined,
      lat: lat || undefined,
      lon: lon || undefined,
    },
  });

  return response.data;
};

export const getHistory = async (filters = {}) => {
  const response = await api.get("/history", {
    params: filters,
  });

  return response.data;
};
export const deleteHistory = async (id) => {
  const response = await api.delete(`/history/${id}`);
  return response.data;
};

export default api;