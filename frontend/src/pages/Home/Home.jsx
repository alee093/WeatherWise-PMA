import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import Forecast from "../../components/Forecast/Forecast";
import Recommendation from "../../components/Recomendation/Recommendation";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <>
      <Header />
      <SearchBar />
      <WeatherCard />
      <Forecast />
      <Recommendation />
      <Footer />
    </>
  );
}

export default Home;