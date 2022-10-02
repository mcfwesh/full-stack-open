import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: "",
  reducers: {
    search: (state, action) => {
      const filter = action.payload;
      state = filter;
      return state;
    },
  },
});

export const { search } = filterSlice.actions;
export default filterSlice.reducer;
