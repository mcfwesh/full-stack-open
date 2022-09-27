import PropTypes from "prop-types";

const Login = ({
  handleLogin,
  username,
  password,
  setPassword,
  setUsername,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          name="username"
          value={username}
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          name="password"
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button id="login" type="submit">
        login
      </button>
    </form>
  );
};

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
