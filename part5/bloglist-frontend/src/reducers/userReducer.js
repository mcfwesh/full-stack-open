import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../services/users";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    getUsers: (state, action) => {
      return action.payload;
    },
  },
});

export const { getUsers } = userSlice.actions;

export const getUsersAction = () => {
  return async (dispatch) => {
    const users = await getAllUsers();
    dispatch(getUsers(users));
  };
};

export default userSlice.reducer;
