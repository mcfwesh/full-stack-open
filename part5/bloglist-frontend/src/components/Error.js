import PropTypes from "prop-types";

const Error = ({ errorMessage }) => {
  return (
    <div
      className="error"
      style={{
        color: "red",
        padding: "5px",
        border: "3px solid",
        fontSize: "1.5rem",
      }}
    >
      {errorMessage}
    </div>
  );
};

Error.propTypes = {
  errorMessage: PropTypes.string,
};

export default Error;
