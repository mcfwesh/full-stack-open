import PropTypes from "prop-types";

const Info = ({ info }) => {
  return (
    <div
      style={{
        color: "green",
        padding: "5px",
        border: "3px solid",
        fontSize: "1.5rem",
      }}
    >
      {info}
    </div>
  );
};

Info.propTypes = {
  info: PropTypes.string.isRequired,
};

export default Info;
