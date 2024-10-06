const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');

// Get all pizzas
router.get('/', pizzaController.getPizzas);

// Add a new pizza
router.post('/', pizzaController.addPizza);

// Delete a pizza
router.delete('/:id', pizzaController.deletePizza);

// Get a pizza by ID
router.get('/:id', pizzaController.getPizzaById);

// Update a pizza
router.put('/:id', pizzaController.updatePizza);

module.exports = router;
