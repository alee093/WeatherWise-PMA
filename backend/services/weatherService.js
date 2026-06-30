const getWeather = async (city) => {

    return {
        city,
        temperature: 18,
        humidity: 76,
        wind: 15,
        description: "Cloudy"
    };

};

module.exports = {
    getWeather
};