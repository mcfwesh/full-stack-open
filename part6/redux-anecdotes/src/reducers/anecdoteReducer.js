import { createSlice } from "@reduxjs/toolkit";
import {
  getAll,
  createNewAnecdotes,
  updateAnecdote,
} from "../service/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    increaseVote: (state, action) => {
      const id = action.payload;
      const findAnecdote = state.find((anecdote) => anecdote.id === id);
      const updatedAnecdote = {
        ...findAnecdote,
        votes: findAnecdote.votes + 1,
      };
      const updatedState = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      );
      return updatedState;
    },
    addAnecdote: (state, action) => {
      state.push(action.payload);
    },

    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { increaseVote, addAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const response = await getAll();
    dispatch(setAnecdotes(response));
  };
};

export const createAnecdotes = (content) => {
  return async (dispatch) => {
    const response = await createNewAnecdotes(content);
    dispatch(addAnecdote(response));
  };
};

export const updateVotes = (id, update) => {
  return async (dispatch) => {
    await updateAnecdote(id, update);
    dispatch(increaseVote(id));
  };
};

export default anecdoteSlice.reducer;
