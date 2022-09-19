import { useState, useEffect } from "react";
import axios from "axios";
import Display from "./Display";
import Search from "./Search";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [queryString, setQueryString] = useState("");
  const [displayState, setDisplayState] = useState(null);

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

  return (
    <div className="app">
      <Search queryString={queryString} handleQueryString={handleQueryString} />
      <Display
        data={data}
        queryString={queryString}
        displayState={displayState}
        setDisplayState={setDisplayState}
      />
    </div>
  );
}

export default App;
