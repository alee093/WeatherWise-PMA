import { getWeatherInfo } from "../../utils/weatherUtils";
import "./Forecast.css";

function Forecast({ forecast }) {
  if (!forecast) return null;

  return (
    <section className="forecast-section">
      <h2 className="forecast-title">5-Day Forecast</h2>

      <div className="forecast-container">
        {forecast.time.map((day, index) => {
          const weatherInfo = getWeatherInfo(
            forecast.weatherCode?.[index] ?? 0
          );

          return (
            <div key={day} className="forecast-card">
              <p className="forecast-day">
                {new Date(day).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>

              <span className="forecast-icon">
                {weatherInfo.icon}
              </span>

              <p className="forecast-date">
                {new Date(day).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>

              <div className="forecast-temp">
                <span className="max">
                  ↑ {Math.round(forecast.temperature_2m_max[index])}°
                </span>

                <span className="min">
                  ↓ {Math.round(forecast.temperature_2m_min[index])}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Forecast;