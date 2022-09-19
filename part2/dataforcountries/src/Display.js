import Toggledisplay from "./ToggleDisplay";

const Display = ({
  data,
  queryString,
  displayState,
  setDisplayState,
  weather,
}) => {
  return (
    <div>
      {data?.length &&
        (data?.length > 10 ? (
          <div>Too many matches, specify another filter</div>
        ) : data?.length > 1 && data?.length <= 10 ? (
          <Toggledisplay
            data={data}
            displayState={displayState}
            setDisplayState={setDisplayState}
          />
        ) : data?.length === 1 ? (
          data?.map((d, index) => (
            <div key={index}>
              <h1>{d.name.common}</h1>
              <br />
              <p>Capital: {d.capital}</p>
              <p>Area: {d.area}</p>
              <br />
              Languages
              <ul>
                {Object.values(d.languages).map((l, index) => (
                  <li key={index}>{l}</li>
                ))}
              </ul>
              <img src={d.flags.png} alt="flag" />
              <h4>Weather in {d.capital}</h4>
              <p>Temperature: {weather?.temperature} Celsius</p>
              <img
                src={`http://openweathermap.org/img/wn/${weather?.icon}@2x.png`}
                alt="weather condition"
              />
              <p> Wind Speed: {weather?.wind} </p>
            </div>
          ))
        ) : null)}
    </div>
  );
};

export default Display;
