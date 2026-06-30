const axios = require("axios");

const getWeather = async (city) => {
  if (!city) {
    throw new Error("City is required");
  }

  const geocodingResponse = await axios.get(
    "https://geocoding-api.open-meteo.com/v1/search",
    {
      params: {
        name: city,
        count: 1,
        language: "en",
        format: "json",
      },
    }
  );

  const location = geocodingResponse.data.results?.[0];

  if (!location) {
    throw new Error("City not found");
  }

  const { latitude, longitude, name, country } = location;

  const weatherResponse = await axios.get(
    "https://api.open-meteo.com/v1/forecast",
    {
      params: {
        latitude,
        longitude,
        current: [
          "temperature_2m",
          "relative_humidity_2m",
          "apparent_temperature",
          "wind_speed_10m",
        ],
      },
    }
  );

  const current = weatherResponse.data.current;

  return {
    city: name,
    country,
    latitude,
    longitude,
    temperature: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    feelsLike: current.apparent_temperature,
    wind: current.wind_speed_10m,
  };
};

module.exports = {
  getWeather,
};