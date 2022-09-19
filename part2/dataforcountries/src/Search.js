const Search = ({ queryString, handleQueryString }) => {
  return (
    <div>
      <label>Find Countries</label>
      <input type="text" onChange={handleQueryString} value={queryString} />
    </div>
  );
};

export default Search;
