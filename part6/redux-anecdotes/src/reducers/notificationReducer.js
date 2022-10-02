import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: "",
  reducers: {
    appendNotification: (state, action) => {
      const content = action.payload;
      state = content;
      return state;
    },
    clearNotification: (state, action) => {
      const init = notificationSlice.getInitialState();
      return init;
    },
  },
});

export const { appendNotification, clearNotification } =
  notificationSlice.actions;

export const newNotification = (content, timeout) => {
  return (dispatch) => {
    dispatch(appendNotification(content));
    const timeoutID = setTimeout(() => dispatch(clearNotification()), timeout);
    return timeoutID;
  };
};

export default notificationSlice.reducer;
