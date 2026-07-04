const axios = require("axios");

const getWeather = async (city, lat, lon) => {
  if (!city && !lat && !lon) {
    throw new Error("City or coordinates are required");
  }

  let latitude, longitude, name, country;

  if (lat && lon) {
    latitude = Number(lat);
    longitude = Number(lon);

    let reverseResponse;

    try {
      reverseResponse = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            lat: latitude,
            lon: longitude,
            format: "json",
          },
          headers: {
            "User-Agent": "WeatherWise/1.0",
          },
          timeout: 8000,
        }
      );
    } catch (err) {
      throw new Error("NOMINATIM_ERROR: " + err.message);
    }

    const address = reverseResponse.data.address;

    name =
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.county ||
      "Current Location";

    country = address.country || "Unknown";
  }
  else {

    let geocodingResponse;

    try {
      geocodingResponse = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        {
          params: {
            name: city,
            count: 1,
            language: "en",
            format: "json",
          },
          timeout: 8000,
        }
      );
    } catch (err) {
      throw new Error("GEOCODING_ERROR: " + err.message);
    }

    const location = geocodingResponse.data.results?.[0];

    if (!location) {
      throw new Error("City not found");
    }

    latitude = location.latitude;
    longitude = location.longitude;
    name = location.name;
    country = location.country;

  }

  let weatherResponse;

  try {
    weatherResponse = await axios.get(
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
            "weather_code",
            "surface_pressure",
            "visibility",
            "uv_index",
          ],

          daily: [
            "weathercode",
            "temperature_2m_max",
            "temperature_2m_min",
            "sunrise",
            "sunset"
          ],

          forecast_days: 5,
          timezone: "auto",
        },
        timeout: 8000,
      }
    );
  } catch (err) {
    throw new Error("FORECAST_ERROR: " + err.message);
  }

  const current = weatherResponse.data.current;
  const daily = weatherResponse.data.daily;

  if (!current || !daily) {
    throw new Error("Weather data not available");
  }

  const getRecommendations = (
    temperature,
    humidity,
    wind,
    weatherCode,
    sunrise,
    sunset
  ) => {
    const recommendations = [];

    if (temperature <= 5)
      recommendations.push({
        category: "👕",
        text: "Wear a heavy coat, gloves and warm clothing.",
      });
    else if (temperature <= 15)
      recommendations.push({
        category: "👕",
        text: "A jacket or sweater is recommended.",
      });
    else if (temperature >= 28)
      recommendations.push({
        category: "👕",
        text: "Wear light clothing and sunglasses.",
      });

    if (weatherCode <= 3)
      recommendations.push({
        category: "🚶",
        text: "Great weather for walking, cycling or sightseeing.",
      });
    else
      recommendations.push({
        category: "🚶",
        text: "Outdoor plans may be affected by weather conditions.",
      });

    if (wind >= 30)
      recommendations.push({
        category: "🚗",
        text: "Strong winds expected. Drive carefully.",
      });
    else
      recommendations.push({
        category: "🚗",
        text: "Good conditions for traveling.",
      });

    if (humidity >= 80)
      recommendations.push({
        category: "💧",
        text: "High humidity may make it feel warmer.",
      });

    if (temperature >= 30)
      recommendations.push({
        category: "💧",
        text: "Stay hydrated and avoid prolonged sun exposure.",
      });

    recommendations.push({
      category: "🌅",
      text: `Sunrise: ${new Date(sunrise).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })} | Sunset: ${new Date(sunset).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
    });

    return recommendations;
  };

  const generateAISummary = (
    city,
    temperature,
    humidity,
    wind,
    weatherCode,
    sunrise,
    sunset
  ) => {
    let summary = `The current weather in ${city} is ${temperature}°C. `;

    if (temperature <= 5) {
      summary +=
        "It is very cold outside, so warm clothing is strongly recommended. ";
    } else if (temperature <= 15) {
      summary +=
        "The weather is cool and a jacket would be a good choice. ";
    } else if (temperature >= 28) {
      summary +=
        "Expect warm conditions today. Stay hydrated and avoid long exposure to direct sunlight. ";
    } else {
      summary +=
        "The temperature is comfortable for most outdoor activities. ";
    }

    if (humidity >= 80) {
      summary +=
        "Humidity is high, which may make the weather feel warmer than expected. ";
    }

    if (wind >= 30) {
      summary +=
        "Strong winds are expected, so travel with caution if driving or cycling. ";
    }

    if (weatherCode <= 3) {
      summary +=
        "Weather conditions are favorable for outdoor activities such as walking or sightseeing. ";
    } else {
      summary +=
        "Weather conditions may change during the day, so checking updates is recommended. ";
    }

    summary += `Sunrise is at ${new Date(sunrise).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} and sunset at ${new Date(sunset).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}.`;

    return summary;
  };

  return {
    city: name,
    country,
    latitude,
    longitude,

    temperature: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    feelsLike: current.apparent_temperature,
    wind: current.wind_speed_10m,
    pressure: current.surface_pressure,
    visibility: current.visibility,
    uvIndex: current.uv_index,
    weatherCode: current.weather_code,

    forecast: {
      time: daily.time,
      temperature_2m_max: daily.temperature_2m_max,
      temperature_2m_min: daily.temperature_2m_min,
      weatherCode: daily.weathercode,
    },
    recommendations: getRecommendations(
      current.temperature_2m,
      current.relative_humidity_2m,
      current.wind_speed_10m,
      current.weathercode,
      daily.sunrise[0],
      daily.sunset[0]
    ),
    aiSummary: generateAISummary(
      name,
      current.temperature_2m,
      current.relative_humidity_2m,
      current.wind_speed_10m,
      current.weather_code,
      daily.sunrise[0],
      daily.sunset[0]
    ),
  };
};

module.exports = {
  getWeather,
};