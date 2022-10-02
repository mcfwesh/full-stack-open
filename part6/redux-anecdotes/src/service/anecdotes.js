import axios from "axios";

const baseUrl = "http://localhost:3002/anecdotes";

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createNewAnecdotes = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

export const updateAnecdote = async (id, update) => {
  const response = await axios.put(`${baseUrl}/${id}`, update);
  return response.data;
};
