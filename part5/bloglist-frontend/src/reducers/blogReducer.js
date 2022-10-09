import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    newBlog: (state, action) => {
      const blog = action.payload;
      state.push(blog);
    },
    setBlogs: (state, action) => {
      return action.payload;
    },
    updateBlog: (state, action) => {
      const { id, newUpdate } = action.payload;
      const updatedState = state.map((blog) =>
        blog.id !== id ? blog : newUpdate
      );
      return updatedState;
    },
    removeBlog: (state, action) => {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { newBlog, setBlogs, updateBlog, removeBlog } = blogSlice.actions;

export const createBlogAction = (blog) => {
  console.log(blog);
  return async (dispatch) => {
    const response = await blogService.create(blog);
    console.log(response);
    dispatch(newBlog(response));
  };
};

export const getBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll();
    dispatch(setBlogs(response));
  };
};

export const updateBlogAction = (id, update) => {
  return async (dispatch) => {
    const newUpdate = await blogService.update(id, update);
    dispatch(updateBlog({ id, newUpdate }));
  };
};

export const deleteBlogAction = (id) => {
  return async (dispatch) => {
    await blogService.deleteOne(id);
    dispatch(removeBlog(id));
  };
};
export default blogSlice.reducer;
