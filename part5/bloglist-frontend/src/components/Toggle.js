import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Toggle = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const handleVisibility = () => setVisible(!visible);

  useImperativeHandle(refs, () => {
    return {
      handleVisibility,
    };
  });

  return (
    <div style={{ marginBottom: "20px" }}>
      <button
        style={{ display: visible ? "none" : "" }}
        onClick={handleVisibility}
      >
        {props.buttonLabel}
      </button>
      <div style={{ display: visible ? "" : "none" }}>
        {props.children} <br />
        <button onClick={handleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Toggle.displayName = "Toggle";

Toggle.propTypes = {
  buttonLabel: PropTypes.string,
};

export default Toggle;
