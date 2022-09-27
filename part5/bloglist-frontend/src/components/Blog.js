import { useState } from "react";

import PropTypes from "prop-types";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const handleVisibility = () => setVisible(!visible);

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-list-header">
        <span>Title: {blog.title} </span> <span>Author: {blog.author}</span>{" "}
        <span>
          <button onClick={handleVisibility}>Show</button>
        </span>
      </div>
      {visible && (
        <div className="blog-list-body">
          <p>URL: {blog.url} </p>
          <p>
            Likes: {blog.likes} <button onClick={updateBlog}>Like</button>{" "}
          </p>
          <p>Creator: {blog.user.username}</p>
          <button style={{ backgroundColor: "red" }} onClick={deleteBlog}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
