import axios from 'axios';

const API_URL = 'http://localhost:5000/api/pizzas';

export const getPizzas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addPizza = async (pizza) => {
  await axios.post(API_URL, pizza);
};

export const deletePizza = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updatePizza = async (id, pizza) => {
  await axios.put(`${API_URL}/${id}`, pizza);
};
