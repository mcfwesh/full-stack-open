import useField from "../hooks/useField";
import { useDispatch } from "react-redux";
import { loginAction } from "../reducers/loginReducer";
import { newNotification } from "../reducers/notificationReducer";
import Toggle from "./Toggle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  const dispatch = useDispatch();
  const {
    value: username,
    reset: resetUsername,
    ...otherUsername
  } = useField("username", "text");
  const {
    value: password,
    reset: resetPassword,
    ...otherPassword
  } = useField("password", "password");

  const handleLogin = (e) => {
    e.preventDefault();
    const user = { username, password };
    try {
      dispatch(loginAction(user));
    } catch (error) {
      dispatch(
        newNotification({ info: "Wrong username or password", type: "error" })
      );
    }
    resetUsername();
    resetPassword();
  };

  return (
    <Toggle buttonLabel="Login">
      <form onSubmit={handleLogin}>
        <TextField
          sx={{ display: "block", mb: 1 }}
          label="Username"
          size="small"
          {...otherUsername}
        />
        <TextField
          sx={{ display: "block", mb: 1 }}
          label="Password"
          size="small"
          {...otherPassword}
        />
        <Button
          variant="contained"
          size="small"
          color="success"
          id="login"
          type="submit"
        >
          login
        </Button>
      </form>
    </Toggle>
  );
};

export default Login;
