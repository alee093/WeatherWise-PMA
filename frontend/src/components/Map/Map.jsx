import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map({ weather }) {
  if (!weather) return null;

  return (
    <section>
      <h2>Location Map</h2>

      <MapContainer
        key={[weather.latitude, weather.longitude]}
        center={[weather.latitude, weather.longitude]}
        zoom={11}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[weather.latitude, weather.longitude]}>
          <Popup>
            {weather.city}, {weather.country}
          </Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}

export default Map;