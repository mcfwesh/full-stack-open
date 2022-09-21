import axios from "axios";

const baseUrl = "/api/persons";

export const getAll = () => {
  const response = axios.get(baseUrl);
  return response.then((response) => response.data);
};

export const create = (newPerson) => {
  const response = axios.post(baseUrl, newPerson);
  return response.then((response) => response.data);
};

export const deleteOne = (id) => {
  const response = axios.delete(`${baseUrl}/${id}`);
  return response.then((response) => response);
};

export const updateOne = (id, newPerson) => {
  const response = axios.put(`${baseUrl}/${id}`, newPerson);
  return response.then((response) => response.data);
};
