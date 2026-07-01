const weatherService = require("../services/weatherService");
const historyService = require("../services/historyService");

const getWeather = async (req, res) => {
    try {

        const { city, lat, lon } = req.query;

        const data = await weatherService.getWeather(city, lat, lon);

        res.json(data);

        historyService.addSearch({
          city: data.city,
          country: data.country,
          temperature: data.temperature
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

module.exports = {
    getWeather
};