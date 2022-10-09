import { updateBlogAction } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useField from "../hooks/useField";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddNewComment = () => {
  const dispatch = useDispatch();
  const {
    value: comment,
    reset,
    ...otherComment
  } = useField("comment", "text");
  const id = useParams().id;
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  const addComments = (id) => {
    const newUpdate = {
      ...blog,
      user: blog.user.id,
      comments: [...blog.comments, comment],
    };
    reset();
    dispatch(updateBlogAction(id, newUpdate));
  };

  return (
    <div>
      <form onSubmit={() => addComments(id)}>
        <Box>
          <TextField size="small" {...otherComment} />
        </Box>
        <Button size="small" color="success" type="submit">
          Add comment
        </Button>
      </form>
    </div>
  );
};

export default AddNewComment;
