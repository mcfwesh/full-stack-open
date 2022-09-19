const Persons = ({ persons, queryString, handleDeletePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons
        ?.filter((p) =>
          p.name.toLowerCase().includes(queryString.toLowerCase())
        )
        .map((person, index) => (
          <div key={index}>
            {`${person.name} ${person.number}`}{" "}
            <button onClick={() => handleDeletePerson(person.id)}>
              Delete
            </button>{" "}
          </div>
        ))}
    </div>
  );
};

export default Persons;
