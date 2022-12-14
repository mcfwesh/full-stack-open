import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import AddNewBlog from "./components/AddNewBlog";
import Login from "./components/Login";
import { getBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, loginUser, logoutUser } from "./reducers/loginReducer";
import Users from "./components/Users";
import User from "./components/User";
import { getUsersAction } from "./reducers/userReducer";
import Blogs from "./components/Blogs";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import blogService from "./services/blogs";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedInUser);
  console.log(useSelector((state) => state.notifications));
  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getUsersAction());
  }, [dispatch]);

  useEffect(() => {
    const loggedInUserJson = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJson) {
      const user = JSON.parse(loggedInUserJson);
      dispatch(loginUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(logoutUser());
  };

  if (user === null) {
    return (
      <Box p={2}>
        <Notification />
        <Login />
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Box>
        <AppBar sx={{ bgcolor: "lime" }} position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Button LinkComponent={Link} href="/">
                blogs
              </Button>
              <Button LinkComponent={Link} href="/users">
                users
              </Button>
            </Box>
            <Typography component="div" sx={{ flexGrow: 1 }}>
              Welcome <b>{user.username}</b>{" "}
            </Typography>
            <Button variant="contained" size="small" onClick={handleLogout}>
              logout
            </Button>
          </Toolbar>
        </AppBar>
        <Typography variant="h1">Blogs App</Typography>
        <br />
        <Notification />
        <Box display="flex" justifyContent="end">
          <AddNewBlog />
        </Box>

        <br />
        <Router>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/" element={<Blogs />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </Router>
      </Box>
    </Box>
  );
};

export default App;
