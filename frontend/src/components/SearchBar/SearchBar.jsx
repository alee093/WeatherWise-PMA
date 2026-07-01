import { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!city.trim()) return;

    onSearch(city, null, null);

    setCity("");
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      onSearch(null, lat, lon);
    });
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button type="submit">
          Search
        </button>
      </form>

      <button type="button" onClick={handleLocation}>
        📍 My Location
      </button>
    </section>
  );
}

export default SearchBar;