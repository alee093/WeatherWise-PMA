import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
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

export default api;