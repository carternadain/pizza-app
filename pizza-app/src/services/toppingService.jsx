import axios from 'axios';

const API_URL = 'http://localhost:5000/api/toppings';

export const getToppings = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTopping = async (topping) => {
  await axios.post(API_URL, topping);
};

export const deleteTopping = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
