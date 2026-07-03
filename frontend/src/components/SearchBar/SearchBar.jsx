import { useState } from "react";
import "./SearchBar.css";

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
    <section className="search-section">
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />

        <button type="submit" className="search-button">
          <i className="bi bi-search"></i>
        </button>
      </form>

      <button type="button" onClick={handleLocation} className="location-button">
        <i className="bi bi-geo-alt"></i> My Location
      </button>
    </section>
  );
}

export default SearchBar;