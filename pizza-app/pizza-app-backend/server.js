const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample pizza data
const pizzas = [
  { id: 1, name: 'Margherita', ingredients: ['Tomato', 'Mozzarella', 'Basil'] },
  { id: 2, name: 'Pepperoni', ingredients: ['Tomato', 'Mozzarella', 'Pepperoni'] },
  { id: 3, name: 'BBQ Chicken', ingredients: ['BBQ Sauce', 'Chicken', 'Onions'] },
];

// Sample toppings data
const toppings = [
  { id: 1, name: 'Cheese' },
  { id: 2, name: 'Pepperoni' },
  { id: 3, name: 'Mushrooms' },
  { id: 4, name: 'Onions' },
  { id: 5, name: 'Olives' },
];

// Route to get pizzas
app.get('/api/pizzas', (req, res) => {
  try {
    res.json(pizzas);
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get toppings
app.get('/api/toppings', (req, res) => {
  try {
    res.json(toppings);
  } catch (error) {
    console.error('Error fetching toppings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
