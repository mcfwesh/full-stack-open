import { useEffect, useState } from "react";
import axios from "axios";
const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    const { capitalInfo } = country;
    const fetchResponse = () => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${capitalInfo.latlng[0]}&lon=${capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_OPEN_WEATHER_TOKEN}&&units=metric`
        )
        .then((response) => {
          const { main, wind, weather } = response.data;
          setWeather({
            ...weather,
            temperature: main?.temp,
            wind: wind?.speed,
            icon: weather[0].icon,
          });
        })
        .catch((error) => console.log(error));
    };
    fetchResponse();
  }, []);

  return (
    <div>
      <h4>Weather in {country.capital}</h4>
      <p>Temperature: {weather?.temperature} Celsius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather?.icon}@2x.png`}
        alt="weather condition"
      />
      <p> Wind Speed: {weather?.wind} </p>
    </div>
  );
};

export default Weather;
