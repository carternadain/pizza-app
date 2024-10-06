const express = require('express');
const router = express.Router();
const toppingController = require('../controllers/toppingController');

// Get all toppings
router.get('/', toppingController.getToppings);

// Get a topping by ID
router.get('/:id', toppingController.getToppingById); // New route added

// Add a new topping
router.post('/', toppingController.addTopping);

// Update a topping
router.put('/:id', toppingController.updateTopping);

// Delete a topping
router.delete('/:id', toppingController.deleteTopping);

module.exports = router;
