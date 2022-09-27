import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Error from "./components/Error";
import Info from "./components/Info";
import AddNewBlog from "./components/AddNewBlog";
import blogService from "./services/blogs";
import { login } from "./services/login";
import Login from "./components/Login";
import Toggle from "./components/Toggle";

const App = () => {
  const blogRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [info, setInfo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUserJson = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJson) {
      const user = JSON.parse(loggedInUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const createBlog = async ({ title, url, author }) => {
    blogRef.current.handleVisibility();
    const blog = await blogService.create({ title, author, url });
    setBlogs([...blogs, blog]);
    setInfo(`The blog titled ${blog.title} by ${blog.author} has been created`);
    setTimeout(() => setInfo(""), 5000);
  };

  const errorCreatingBlog = () => {
    setErrorMessage("Blog cannot be created");
    setTimeout(() => setErrorMessage(""), 5000);
  };

  const updateBlog = async (id) => {
    const findBlog = blogs.find((blog) => blog.id === id);
    const newUpdate = {
      user: findBlog.user.id,
      likes: findBlog.likes + 1,
      author: findBlog.author,
      title: findBlog.title,
      url: findBlog.url,
    };

    const updatedBlog = await blogService.update(id, newUpdate);
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)));
  };

  const deleteBlog = async (id) => {
    const findBlog = blogs.find((blog) => blog.id === id);

    if (window.confirm(`Remove ${findBlog.title} by ${findBlog.author}?`)) {
      await blogService.deleteOne(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const newUser = await login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(newUser));
      blogService.setToken(newUser.token);
      setUser(newUser);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("invalid username or password");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const renderAllBlogs = () =>
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          updateBlog={() => updateBlog(blog.id)}
          deleteBlog={() => deleteBlog(blog.id)}
          blog={blog}
        />
      ));

  return (
    <div>
      <h2>blogs</h2>
      <br />
      {errorMessage ? (
        <Error errorMessage={errorMessage} />
      ) : info ? (
        <Info info={info} />
      ) : null}
      {user ? (
        <div>
          <div>
            Welcome <b>{user.username}</b>{" "}
          </div>
          <button onClick={handleLogout}>logout</button>
          <br />
          <br />
          <Toggle ref={blogRef} buttonLabel="Add new blog">
            <AddNewBlog
              createBlog={createBlog}
              errorCreatingBlog={errorCreatingBlog}
            />
          </Toggle>

          {renderAllBlogs()}
        </div>
      ) : (
        <Toggle buttonLabel="Login">
          <Login
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Toggle>
      )}
    </div>
  );
};

export default App;
