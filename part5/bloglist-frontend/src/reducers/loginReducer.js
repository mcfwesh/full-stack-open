import { createSlice } from "@reduxjs/toolkit";
import { login } from "../services/login";

import blogService from "../services/blogs";
import { newNotification } from "./notificationReducer";

const loginSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    loginUser: (state, action) => {
      const user = action.payload;
      state = user;
      return state;
    },
    logoutUser: () => {
      return loginSlice.getInitialState();
    },
  },
});

export const { loginUser, logoutUser } = loginSlice.actions;

export const loginAction = (user) => {
  const loggedInUserJson = window.localStorage.getItem("loggedInUser");
  return async (dispatch) => {
    if (loggedInUserJson) {
      const user = JSON.parse(loggedInUserJson);
      dispatch(loginUser(user));
      blogService.setToken(user.token);
    } else {
      try {
        const { username, password } = user;
        const newUser = await login({ username, password });
        window.localStorage.setItem("loggedInUser", JSON.stringify(newUser));
        blogService.setToken(newUser.token);
        dispatch(loginUser(newUser));
      } catch (error) {
        dispatch(newNotification("invalid username and password"));
      }
    }
  };
};

export default loginSlice.reducer;
