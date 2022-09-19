const Toggledisplay = ({ data, displayState, setDisplayState }) => {
  const handleDisplayState = (index) => () => {
    if (displayState) {
      const copy = [...displayState];
      copy[index] = !displayState[index];
      setDisplayState(copy);
    }
  };

  return (
    <div>
      {data?.length
        ? data?.map((d, index, array) => (
            <div key={index}>
              <div>
                <span>{d.name.common}</span>{" "}
                <button onClick={handleDisplayState(index)}>
                  {displayState[index] ? "Hide" : "Show"}
                </button>
              </div>

              <div style={{ display: displayState[index] ? "block" : "none" }}>
                <h1>{d.name.common}</h1> <p>Capital: {d.capital}</p>
                <p>Area: {d.area}</p>
                <br />
                Languages
                <ul>
                  {Object.values(d.languages).map((l, index) => (
                    <li key={index}>{l}</li>
                  ))}
                </ul>
                <img src={d.flags.png} alt="flag" />
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default Toggledisplay;
