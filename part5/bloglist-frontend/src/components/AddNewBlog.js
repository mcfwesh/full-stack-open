import { useRef } from "react";
import { newNotification } from "../reducers/notificationReducer";
import { createBlogAction } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import Toggle from "./Toggle";
import useField from "../hooks/useField";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddNewBlog = () => {
  const blogRef = useRef();
  const dispatch = useDispatch();
  const {
    value: title,
    reset: resetTitle,
    ...restTitle
  } = useField("title", "text");
  const {
    value: author,
    reset: resetAuthor,
    ...restAuthor
  } = useField("title", "text");
  const { value: url, reset: resetUrl, ...restUrl } = useField("title", "text");

  const createBlog = async (blog) => {
    try {
      blogRef.current.handleVisibility();
      await dispatch(createBlogAction(blog));
      dispatch(
        newNotification({
          info: `The blog titled ${title} by ${author} has been created`,
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        newNotification({
          info: "Blog cannot be created",
          type: "error",
        })
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({ title, url, author });
    resetAuthor();
    resetTitle();
    resetUrl();
  };

  return (
    <Toggle ref={blogRef} buttonLabel="Add new blog">
      <form onSubmit={handleSubmit}>
        <Box>
          <Box mb={1}>
            <TextField
              size="small"
              label="Title"
              {...restTitle}
              placeholder="Add title"
            />
          </Box>
          <Box mb={1}>
            <TextField
              size="small"
              placeholder="Add author"
              label="Author"
              {...restAuthor}
            />
          </Box>
          <Box mb={1}>
            <TextField
              size="small"
              placeholder="Add URL"
              label="URL"
              {...restUrl}
            />
          </Box>

          <br />
          <Button
            size="small"
            color="success"
            variant="contained"
            type="submit"
            sx={{ display: "inline-flex" }}
          >
            Save
          </Button>
        </Box>
      </form>
    </Toggle>
  );
};

export default AddNewBlog;
