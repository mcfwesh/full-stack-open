import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }
  console.log(result.data);
  const books = result.data.allBooks;
  const genres = books.map((book) => book.genres).flat();
  const getUniqueGenres = [...new Set(genres)];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {getUniqueGenres.map((genre) => (
          <button onClick={() => result.refetch({ genre: genre })} key={genre}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
