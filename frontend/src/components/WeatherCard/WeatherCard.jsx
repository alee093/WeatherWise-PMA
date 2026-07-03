import { getWeatherInfo } from "../../utils/weatherUtils";
import "./WeatherCard.css";

function WeatherCard({ weather }) {
  if (!weather) {
    return (
      <section className="weather-card empty">
        <h2>Current Weather</h2>
        <p>Search for a city to view the weather.</p>
      </section>
    );
  }

  const weatherInfo = getWeatherInfo(weather.weatherCode);

  return (
    <section className="weather-card">
      <div className="weather-card-header">
        <div>
          <h2>{weather.city}</h2>
          <p>{weather.country}</p>
          <p>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="weather-status">
          <div className="weather-icon">{weatherInfo.icon}</div>
          <span>{weatherInfo.description}</span>
        </div>
      </div>

      <div className="temperature-section">
        <h1>{Math.round(weather.temperature)}°</h1>

        <div className="temperature-range">
          <span className="max-temp">
            ↑ {Math.round(weather.forecast.temperature_2m_max[0])}°
          </span>

          <span className="min-temp">
            ↓ {Math.round(weather.forecast.temperature_2m_min[0])}°
          </span>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-item">
          <span>🥵 Feels Like</span>
          <strong>{Math.round(weather.feelsLike)}°C</strong>
        </div>

        <div className="detail-item">
          <span>💧 Humidity</span>
          <strong>{weather.humidity}%</strong>
        </div>

        <div className="detail-item">
          <span>💨 Wind</span>
          <strong>{weather.wind} km/h</strong>
        </div>

        <div className="detail-item">
          <span>🌍 Pressure</span>
          <strong>{weather.pressure} hPa</strong>
        </div>

        <div className="detail-item">
          <span>👁 Visibility</span>
          <strong>{(weather.visibility / 1000).toFixed(1)} km</strong>
        </div>

        <div className="detail-item">
          <span>☀ UV Index</span>
          <strong>{weather.uvIndex}</strong>
        </div>
      </div>
    </section>
  );
}

export default WeatherCard;