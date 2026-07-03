import { useState, useEffect } from "react";

import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import AiAssistant from "../../components/AiAssistant/AiAssistant";
import Map from "../../components/Map/Map";
import Forecast from "../../components/Forecast/Forecast";
import Recommendation from "../../components/Recomendation/Recommendation";
import History from "../../components/History/History";
import Footer from "../../components/Footer/Footer";

import "./Home.css";

import { getWeather } from "../../services/api";

function Home() {
  const [weather, setWeather] = useState(null);
  const [historyRefresh, setHistoryRefresh] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    handleSearch("London");
  }, []);

  const handleSearch = async (city, lat, lon) => {
    try {

      setLoading(true);
      setError("");

      const data = await getWeather(city, lat, lon);

      setWeather(data);

      setHistoryRefresh((prev) => prev + 1);

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.error ||
        "Unable to retrieve weather information."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <Header />

      <main className="container">
        <SearchBar onSearch={handleSearch} />

        {loading && (
          <section className="loading-card">

            <div className="loader"></div>

            <h3>Loading weather...</h3>

            <p>Please wait a moment.</p>

          </section>
        )}

        {error && (
          <section className="error-card">

            <span>⚠️</span>

            <h3>Something went wrong</h3>

            <p>{error}</p>

          </section>
        )}

        {weather && (
          <>
            <section className="top-section">
              <WeatherCard weather={weather} />
              <AiAssistant summary={weather.aiSummary} weather={weather} />
            </section>

            <Forecast forecast={weather.forecast} />

            <Map weather={weather} />

            <section className="bottom-section">
              <History refresh={historyRefresh} onSelectCity={handleSearch} />
            </section>
          </>
        )}

        <Footer />
      </main>
    </>
  );
}

export default Home;