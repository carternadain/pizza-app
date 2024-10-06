const mongoose = require('mongoose');

const ToppingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // Ensures no duplicate toppings
  }
});

module.exports = mongoose.model('Topping', ToppingSchema);
