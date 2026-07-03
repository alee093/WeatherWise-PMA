import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";

function Map({ weather }) {
  if (!weather) return null;

  return (
    <section className="map-section">
      <div className="map-header">
        <div>
          <h2>Location</h2>
          <p>
            {weather.city}, {weather.country}
          </p>
        </div>

        <a
          href={`https://www.google.com/maps?q=${weather.latitude},${weather.longitude}`}
          target="_blank"
          rel="noreferrer"
          className="map-button"
        >
          🗺 Open in Google Maps
        </a>
      </div>

      <MapContainer
        key={`${weather.latitude}-${weather.longitude}`}
        center={[weather.latitude, weather.longitude]}
        zoom={11}
        className="weather-map"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[weather.latitude, weather.longitude]}>
          <Popup>
            <strong>{weather.city}</strong>
            <br />
            {weather.country}
          </Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}

export default Map;