const express = require('express');
const router = express.Router();
const Pizza = require('../models/Pizza');
const Topping = require('../models/Toppings');

// Get all pizzas
router.get('/', async (req, res) => {
  try {
    const pizzas = await Pizza.find().populate('toppings');
    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new pizza
router.post('/', async (req, res) => {
  const pizza = new Pizza({
    name: req.body.name,
    toppings: req.body.toppings // List of Topping IDs
  });

  try {
    const newPizza = await pizza.save();
    res.status(201).json(newPizza);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a pizza
router.delete('/:id', async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ message: 'Pizza not found' });
    }

    await pizza.remove();
    res.json({ message: 'Pizza deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
