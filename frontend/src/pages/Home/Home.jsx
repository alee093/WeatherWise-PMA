import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import Forecast from "../../components/Forecast/Forecast";
import Recommendation from "../../components/Recomendation/Recommendation";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";

function Home() {
  const [weather, setWeather] = useState(null);
  const handleSearch = async (city) => {
    console.log(city);
  }
  return (
    <>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <WeatherCard weather={weather} />
      <Forecast />
      <Recommendation />
      <Footer />
    </>
  );
}

export default Home;