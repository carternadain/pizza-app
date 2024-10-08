const Pizza = require('../models/Pizza');

// Get all pizzas
const getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find().populate('toppings');
    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a pizza by ID
const getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id).populate('toppings'); // Ensure toppings are populated
    if (!pizza) {
      return res.status(404).json({ message: 'Pizza not found' });
    }
    res.json(pizza);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new pizza
const addPizza = async (req, res) => {
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
};

// Update a pizza by ID
const updatePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id); // Find pizza by ID
    if (!pizza) {
      return res.status(404).json({ message: 'Pizza not found' });
    }

    // Update pizza fields
    pizza.name = req.body.name || pizza.name; 
    pizza.toppings = req.body.toppings || pizza.toppings; 

    const updatedPizza = await pizza.save(); // Save the updated pizza
    res.json(updatedPizza);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const mongoose = require('mongoose');

const deletePizza = async (req, res) => {
  try {
    console.log('Pizza ID:', req.params.id); // Log the incoming pizza ID

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid pizza ID' });
    }

    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ message: 'Pizza not found' });
    }

    await Pizza.deleteOne({ _id: req.params.id });
    res.json({ message: 'Pizza deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updatePizzaToppings = async (req, res) => {
  try {
      const pizzaId = req.params.id;
      const { toppings } = req.body; // Destructure toppings from body

      console.log('Received toppings:', toppings); // Log the incoming topping data

      // Validate pizza ID
      if (!mongoose.Types.ObjectId.isValid(pizzaId)) {
          return res.status(400).json({ message: 'Invalid pizza ID' });
      }

      // Validate that all topping IDs are valid ObjectIds
      if (toppings.some(topping => !mongoose.Types.ObjectId.isValid(topping))) {
          return res.status(400).json({ message: 'Invalid topping ID' });
      }

      const pizza = await Pizza.findById(pizzaId);
      if (!pizza) {
          return res.status(404).json({ message: 'Pizza not found' });
      }

      // Update toppings and save
      pizza.toppings = toppings;
      const updatedPizza = await pizza.save();
      
      res.json(updatedPizza);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};



// Export the controller functions
module.exports = {
  getPizzas,
  getPizzaById,   // Added this method
  addPizza,
  updatePizza,    // Added this method
  deletePizza,
  updatePizzaToppings
};
