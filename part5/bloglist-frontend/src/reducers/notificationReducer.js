import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notificatications",
  initialState: null,
  reducers: {
    setNotification: (state, action) => {
      state = action.payload;
      return state;
    },

    clearNotification: () => {
      return notificationSlice.getInitialState();
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const newNotification = (info) => {
  return (dispatch) => {
    dispatch(setNotification(info));
    setTimeout(() => dispatch(clearNotification()), 3000);
  };
};
export default notificationSlice.reducer;
