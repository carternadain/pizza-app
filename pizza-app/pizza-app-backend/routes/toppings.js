const express = require('express');
const router = express.Router();
const Topping = require('../models/Toppings');

// Get all toppings
router.get('/', async (req, res) => {
  try {
    const toppings = await Topping.find();
    res.json(toppings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new topping
router.post('/', async (req, res) => {
  const topping = new Topping({
    name: req.body.name
  });

  try {
    const newTopping = await topping.save();
    res.status(201).json(newTopping);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a topping
router.delete('/:id', async (req, res) => {
  try {
    const topping = await Topping.findById(req.params.id);
    if (!topping) {
      return res.status(404).json({ message: 'Topping not found' });
    }

    await topping.remove();
    res.json({ message: 'Topping deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
