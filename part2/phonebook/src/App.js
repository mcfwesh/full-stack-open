import { useState, useEffect } from "react";
import AddNew from "./AddNew";
import Persons from "./Persons";
import Search from "./Search";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(response.data);
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    persons?.find((p) => p.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  };

  const handleSearch = (e) => {
    setQueryString(e.target.value);
  };

  const handleName = (e) => setNewName(e.target.value);
  const handleNumber = (e) => setNewNumber(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Search queryString={queryString} handleSearch={handleSearch} />
      <AddNew
        newName={newName}
        handleSubmit={handleSubmit}
        newNumber={newNumber}
        handleNumber={handleNumber}
        handleName={handleName}
      />
      <Persons queryString={queryString} persons={persons} />
    </div>
  );
};

export default App;
