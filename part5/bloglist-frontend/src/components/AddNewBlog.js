import { useState } from "react";
import PropTypes from "prop-types";

const AddNewBlog = ({ createBlog, errorCreatingBlog }) => {
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const handleAddNewBlogs = async (e) => {
    e.preventDefault();
    try {
      createBlog({ title, url, author });
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      errorCreatingBlog();
    }
  };

  return (
    <div>
      <form onSubmit={handleAddNewBlogs}>
        <div>
          Title
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Add title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            name="author"
            value={author}
            placeholder="Add author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          URL
          <input
            type="text"
            name="url"
            value={url}
            placeholder="Add url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

AddNewBlog.propTypes = {
  createBlog: PropTypes.func.isRequired,
  errorCreatingBlog: PropTypes.func.isRequired,
};

export default AddNewBlog;
