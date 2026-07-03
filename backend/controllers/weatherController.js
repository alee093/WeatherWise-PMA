const weatherService = require("../services/weatherService");
const historyService = require("../services/historyService");

const getWeather = async (req, res) => {
try {
    const { city, lat, lon } = req.query;

    const data = await weatherService.getWeather(city, lat, lon);

    await historyService.addSearch({
    city: data.city,
    country: data.country,
    temperature: data.temperature,
    latitude: data.latitude,
    longitude: data.longitude,
    humidity: data.humidity,
    feelsLike: data.feelsLike,
    wind: data.wind,
    pressure: data.pressure,
    visibility: data.visibility,
    uvIndex: data.uvIndex,
    weatherCode: data.weatherCode,
    });

    res.json(data);
} catch (error) {
    res.status(500).json({
    error: error.message,
    });
}
};

module.exports = {
getWeather,
};