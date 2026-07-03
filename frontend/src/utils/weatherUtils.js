export const getWeatherInfo = (code) => {
  switch (code) {
    case 0:
      return {
        icon: "☀️",
        description: "Clear Sky",
      };

    case 1:
    case 2:
    case 3:
      return {
        icon: "⛅",
        description: "Partly Cloudy",
      };

    case 45:
    case 48:
      return {
        icon: "🌫️",
        description: "Fog",
      };

    case 51:
    case 53:
    case 55:
      return {
        icon: "🌦️",
        description: "Drizzle",
      };

    case 61:
    case 63:
    case 65:
      return {
        icon: "🌧️",
        description: "Rain",
      };

    case 71:
    case 73:
    case 75:
      return {
        icon: "❄️",
        description: "Snow",
      };

    case 95:
      return {
        icon: "⛈️",
        description: "Thunderstorm",
      };

    default:
      return {
        icon: "🌤️",
        description: "Unknown",
      };
  }
};