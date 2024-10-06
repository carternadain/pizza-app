const mongoose = require('mongoose');

const PizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // Ensures no duplicate pizzas
  },
  toppings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topping' // This references the Topping model
    }
  ]
});

module.exports = mongoose.model('Pizza', PizzaSchema);
