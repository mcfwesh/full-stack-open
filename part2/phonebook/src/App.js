import { useState, useEffect } from "react";
import AddNew from "./AddNew";
import Persons from "./Persons";
import Search from "./Search";
import axios from "axios";
import { getAll, create, deleteOne, updateOne } from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [queryString, setQueryString] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isExisting = persons?.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );
    const newPerson = { name: newName, number: newNumber };
    if (!newName) {
      setInfo(`A name must be included for the number, ${newNumber}!`);
    } else if (!newNumber) {
      setInfo(`A number must be included to update ${newName}'s contact!`);
    } else if (isExisting) {
      const { id } = isExisting;
      updateOne(id, newPerson)
        .then((updatedPerson) => {
          if (
            window.confirm(
              `${newName} is already added to phonebook, replace the old number with a new one?`
            )
          ) {
            setPersons(persons.map((p) => (p.id !== id ? p : newPerson)));

            setInfo(`${newName}'s phone number has been updated`);

            setNewName("");
            setNewNumber("");
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.request.status === 401) {
            setInfo(`A name must be included for the number, ${newNumber}!`);
          } else if (error.request.status === 402) {
            setInfo(
              `A number must be included to update ${newName}'s contact!`
            );
          } else {
            setInfo(
              `Information of ${newName} has already been removed from server! `
            );
            setPersons(persons.filter((p) => p.id !== id));
          }
        });
    } else {
      create(newPerson)
        .then((newPerson) => setPersons([...persons, newPerson]))
        .catch((error) => {
          setInfo(error.response.data.error);
        });

      setInfo(`${newPerson.name}'s phone number has been added`);

      setNewName("");
      setNewNumber("");
    }
    setTimeout(() => {
      setInfo("");
    }, 3000);
  };

  const handleDeletePerson = (id) => {
    deleteOne(id).then((response) => console.log(response));
    const filteredPersons = persons?.filter((p) => p.id !== id);
    const toBeDeleted = persons?.filter((p) => p.id === id);

    if (window.confirm(`Delete ${toBeDeleted[0].name}?`)) {
      setPersons(filteredPersons);
    }
  };

  const handleSearch = (e) => {
    setQueryString(e.target.value);
  };

  const handleName = (e) => setNewName(e.target.value);
  const handleNumber = (e) => setNewNumber(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      {info && <div className="info">{info}</div>}
      <Search queryString={queryString} handleSearch={handleSearch} />
      <AddNew
        newName={newName}
        handleSubmit={handleSubmit}
        newNumber={newNumber}
        handleNumber={handleNumber}
        handleName={handleName}
      />
      <Persons
        queryString={queryString}
        persons={persons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
