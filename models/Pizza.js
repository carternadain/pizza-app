const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate pizzas
    trim: true, // Trims whitespace
    minlength: 1, // Minimum length
    maxlength: 50 // Maximum length
  },
  toppings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topping' // This references the Topping model
    }
  ]
});

// Optional: Custom static method to find pizza by name
pizzaSchema.statics.findByName = function(name) {
  return this.findOne({ name });
};

const Pizza = mongoose.model('Pizza', pizzaSchema);
module.exports = Pizza;
