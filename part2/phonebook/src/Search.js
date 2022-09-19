const Search = ({ queryString, handleSearch }) => {
  return (
    <div>
      filter shown with
      <input value={queryString} onChange={handleSearch} />
    </div>
  );
};

export default Search;
