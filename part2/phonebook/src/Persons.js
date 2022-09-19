const Persons = ({ persons, queryString }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons
        ?.filter((p) =>
          p.name.toLowerCase().includes(queryString.toLowerCase())
        )
        .map((person, index) => (
          <div key={index}>{`${person.name} ${person.number}`}</div>
        ))}
    </div>
  );
};

export default Persons;
