import Toggledisplay from "./ToggleDisplay";
import Weather from "./Weather";

const Display = ({ data, queryString, displayState, setDisplayState }) => {
  if (data.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (data.length === 0) {
    return <div>No matches, specify some other fliter</div>;
  }
  if (data.length > 1) {
    return (
      <Toggledisplay
        data={data}
        displayState={displayState}
        setDisplayState={setDisplayState}
      />
    );
  }

  return (
    <div>
      {data?.map((d, index) => (
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
          <Weather country={d} />
        </div>
      ))}
    </div>
  );
};
export default Display;
