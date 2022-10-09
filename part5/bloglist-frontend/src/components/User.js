import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const User = () => {
  const id = useParams().id;

  const user = useSelector((state) => {
    return state.users.find((user) => user.id === id);
  });
  const blogs = useSelector((state) => {
    const { blogs } = state;
    return blogs.filter((blog) => blog.user.id === id);
  });

  return (
    <Paper sx={{ p: 3 }}>
      {user && <Typography variant="h3">{user.username}</Typography>}
      <Typography>Added blogs</Typography>
      <List>
        {blogs.map((blog) => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default User;
