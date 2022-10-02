import { search } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = ({ search, filters }) => {
  const handleChange = (event) => {
    const query = event.target.value;
    search(query);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input value={filters} onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  search,
};

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  };
};

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default ConnectedFilter;
