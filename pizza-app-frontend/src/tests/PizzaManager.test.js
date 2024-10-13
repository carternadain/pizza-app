// PizzaManager.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PizzaList from '../components/PizzaList';
import '@testing-library/jest-dom';
import axios from 'axios';

// Mock axios
jest.mock('axios');

beforeEach(() => {
  // Mock Axios GET request for fetching pizzas
  axios.get.mockResolvedValue({
    data: [
      { name: 'Test Pizza', id: 1 },
      { name: 'Another Pizza', id: 2 }
    ]
  });

  // Mock Axios POST request for adding a pizza
  axios.post.mockResolvedValue({
    data: { name: 'Test Pizza', id: 3 }
  });
});

afterEach(() => {
  // Clear all mocks after each test
  jest.clearAllMocks();
});

test('renders pizza manager title', async () => {
  render(<PizzaList />);
  const titleElement = await screen.findByText(/Manage Pizzas/i);
  expect(titleElement).toBeInTheDocument();
});

test('adds a new pizza', async () => {
  render(<PizzaList />);
  const inputElement = screen.getByPlaceholderText(/Add new pizza/i);
  const addButton = screen.getByText(/Add Pizza/i);

  fireEvent.change(inputElement, { target: { value: 'Test Pizza' } });
  fireEvent.click(addButton);

  // Use waitFor to wait for the new pizza to be rendered
  await waitFor(() => {
    const pizzaElement = screen.getByText(/Test Pizza/i);
    expect(pizzaElement).toBeInTheDocument();
  });
});
