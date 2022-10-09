import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

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
      <Button
        size="small"
        style={{ display: visible ? "none" : "" }}
        onClick={handleVisibility}
      >
        {props.buttonLabel}
      </Button>
      <div style={{ display: visible ? "" : "none" }}>
        {props.children} <br />
        <Button
          sx={{ display: "inline-flex" }}
          variant="contained"
          size="small"
          color="error"
          onClick={handleVisibility}
        >
          cancel
        </Button>
      </div>
    </div>
  );
});

Toggle.displayName = "Toggle";

Toggle.propTypes = {
  buttonLabel: PropTypes.string,
};

export default Toggle;
