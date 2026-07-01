import { useState } from "react";
import styles from "./Home.module.css";

import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import AiAssistant from "../../components/AiAssistant/AiAssistant";
import Map from "../../components/Map/Map";
import Forecast from "../../components/Forecast/Forecast";
import Recommendation from "../../components/Recomendation/Recommendation";
import History from "../../components/History/History";
import Footer from "../../components/Footer/Footer";

import { getWeather } from "../../services/api";

function Home() {

  const [weather, setWeather] = useState(null);
  const [historyRefresh, setHistoryRefresh] = useState(0);

  const handleSearch = async (city, lat, lon) => {
    try {
      const data = await getWeather(city, lat, lon);
      setWeather(data);

      // trigger refresh del history
      setHistoryRefresh(prev => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <WeatherCard weather={weather} />
      <AiAssistant summary={weather?.aiSummary} />
      <Map weather={weather} />
      <Forecast forecast={weather?.forecast} />
      <History refreshTrigger={historyRefresh} />
      <Recommendation recommendations={weather?.recommendations} />
      <Footer />
    </>
  );
}

export default Home;