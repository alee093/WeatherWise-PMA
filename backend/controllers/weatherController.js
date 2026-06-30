const weatherService = require("../services/weatherService");

const getWeather = async (req, res) => {
    try {

        const { city } = req.query;

        const data = await weatherService.getWeather(city);

        res.json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

module.exports = {
    getWeather
};