const mongoose = require('mongoose');

const toppingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Prevent duplicate toppings in the database
        trim: true,
        minlength: 1,  // Minimum length
        maxlength: 50  // Maximum length
    }
});

// Optional: Custom static method to find topping by name
toppingSchema.statics.findByName = function(name) {
    return this.findOne({ name });
};

const Topping = mongoose.model('Topping', toppingSchema);
module.exports = Topping;
