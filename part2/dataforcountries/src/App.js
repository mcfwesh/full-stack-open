import { useState, useEffect } from "react";
import axios from "axios";
import Display from "./Display";
import Search from "./Search";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [queryString, setQueryString] = useState("");
  const [displayState, setDisplayState] = useState(null);
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const filteredData = response.data?.filter((d) =>
        d.name.common.toLowerCase().includes(queryString.toLowerCase())
      );
      setData(filteredData);
    });
  }, [queryString]);

  const handleQueryString = (e) => setQueryString(e.target.value);

  useEffect(() => {
    if (data?.length) {
      setDisplayState(new Array(data.length).fill(false));
    }
  }, [data]);

  useEffect(() => {
    const fetchResponse = () => {
      const { capitalInfo } = data[0];
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
    if (data?.length === 1) {
      fetchResponse();
    }
  }, [data, weather]);

  return (
    <div className="app">
      <Search queryString={queryString} handleQueryString={handleQueryString} />
      <Display
        data={data}
        queryString={queryString}
        displayState={displayState}
        setDisplayState={setDisplayState}
        weather={weather}
      />
    </div>
  );
}

export default App;
