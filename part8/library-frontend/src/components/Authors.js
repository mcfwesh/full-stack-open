import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import React, { useState } from "react";

const NewAuthorYear = ({ authors }) => {
  const [name, setName] = useState("Select an author");
  const [setBornTo, setYear] = useState("");

  const [editYear] = useMutation(EDIT_AUTHOR, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.concat(response.data.editAuthor),
        };
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    editYear({ variables: { name, setBornTo } });
    setName("");
    setYear("");
  };
  const handleSelect = (e) => {
    setName(e.target.value);
  };

  console.log(name);

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {" "}
          name:
          <select defaultValue={name} onChange={handleSelect}>
            <option disabled>Select an author</option>
            {authors.map((author, index) => (
              <option key={index} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          {" "}
          born:{" "}
          <input
            type="text"
            value={setBornTo}
            onChange={({ target }) => setYear(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <NewAuthorYear authors={authors} />
    </div>
  );
};

export default Authors;
