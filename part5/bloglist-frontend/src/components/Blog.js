import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateBlogAction, deleteBlogAction } from "../reducers/blogReducer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import AddNewComment from "./AddNewComment";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = () => {
  const dispatch = useDispatch();

  const id = useParams().id;

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  const updateLikes = (id) => {
    const newUpdate = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };
    dispatch(updateBlogAction(id, newUpdate));
  };

  const deleteBlog = async (id) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlogAction(id));
    }
  };

  if (!blog) return null;

  return (
    <Box component={Paper} p={2} className="blog">
      <div className="blog-list-header">
        <Typography variant="h3">{blog.title}</Typography>
        <Typography variant="h5">by {blog.author}</Typography>
      </div>
      <Typography component={Link} href={blog.url}>
        Reference{" "}
      </Typography>
      <Box
        display="flex"
        width="20%"
        justifyContent="space-between"
        alignItems="baseline"
      >
        <Typography>Likes: {blog.likes}</Typography>
        <Button
          sx={{ width: 10, height: 20 }}
          variant="contained"
          color="secondary"
          onClick={() => updateLikes(blog.id)}
        >
          Like
        </Button>{" "}
      </Box>

      <Typography>Creator: {blog.user.username}</Typography>
      <div>
        <Typography>Comments</Typography>
        <List>
          {blog.comments.map((comment, index) => (
            <ListItem key={index}>{comment}</ListItem>
          ))}
        </List>

        <AddNewComment />
      </div>
      <br />
      <Button
        variant="contained"
        size="small"
        style={{ backgroundColor: "red" }}
        onClick={() => deleteBlog(blog.id)}
      >
        Delete
      </Button>
    </Box>
  );
};

export default Blog;
