import { useState } from "react";

const useField = (name, type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    name,
    type,
    value,
    reset,
    onChange,
    id: name,
  };
};

export default useField;
