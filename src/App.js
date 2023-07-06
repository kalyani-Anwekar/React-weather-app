import { useEffect, useState } from "react";
import Cold from "./assets/cold.jpg";
import Hot from "./assets/Hot.jpg";
import Rainy from "./assets/Rainy.jpg";
import Cloudy from "./assets/Cloudy.jpg";
import Descriptions from "./components/Descriptions.jsx";
import { getFormattedWheatherData } from "./wheatherService";
function App() {
  const [city, setCity] = useState("Nashik");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(Hot);
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWheatherData(city, units);
      setWeather(data);

      //dynamic bg
      if (data) {
        const temperature = data.temp;
    
        if (temperature >= 30) {
          setBg(Hot);
        } else if (temperature >= 20) {
          setBg(Cloudy);
        }else if (temperature >= 10) {
          setBg(Rainy);
        } else {
          setBg(Cold);
        }
      }
    };
    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };
  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City"
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name},${weather.country}`}</h3>
                <img src={weather.iconURL} alt="wheather icon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()}°${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
            {/* bottom description */}
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
