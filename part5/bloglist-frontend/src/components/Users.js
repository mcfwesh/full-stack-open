import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Users = () => {
  const users = useSelector((state) => state.users);
  const blogsCreated = useSelector((state) => {
    const { blogs } = state;
    let userBlogs = [];
    users.forEach((user) => {
      const filteredBlog = blogs.filter(
        (blog) => blog.user.username === user.username
      );
      userBlogs.push({ user: user, blog: filteredBlog });
    });
    return userBlogs;
  });
  console.log(blogsCreated);

  return (
    <TableContainer>
      <Table style={{ textAlign: "center" }}>
        <TableHead>
          <TableRow>
            <TableCell>Users</TableCell>
            <TableCell>Blogs Created</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {blogsCreated.map((blog) => (
            <TableRow key={blog.user.id}>
              <TableCell>
                <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link>
              </TableCell>
              <TableCell>{blog.blog.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Users;
