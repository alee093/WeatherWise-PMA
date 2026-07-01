function Forecast({ forecast }) {
  if (!forecast) return null;

  return (
    <section>
      <h2>5-Day Forecast</h2>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {forecast.time.map((day, index) => (
          <div
            key={day}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              minWidth: "120px",
            }}
          >
            <p>
              {new Date(day).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>

            <p>🔥 Max: {forecast.temperature_2m_max[index]}°C</p>
            <p>❄ Min: {forecast.temperature_2m_min[index]}°C</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Forecast;