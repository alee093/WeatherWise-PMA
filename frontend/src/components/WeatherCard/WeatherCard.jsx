function WeatherCard({ weather }) {
  if (!weather) {
    return (
      <section>
        <h2>Current Weather</h2>
        <p>Search for a city to view the weather.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Current Weather</h2>

      <h3>
        {weather.city}, {weather.country}
      </h3>

      <p>🌡 Temperature: {weather.temperature}°C</p>

      <p>🥵 Feels Like: {weather.feelsLike}°C</p>

      <p>💧 Humidity: {weather.humidity}%</p>

      <p>💨 Wind: {weather.wind} km/h</p>
    </section>
  );
}

export default WeatherCard;