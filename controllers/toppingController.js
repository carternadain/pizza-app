const Topping = require('../models/Toppings');

// Get all toppings
exports.getToppings = async (req, res) => {
    try {
        const toppings = await Topping.find({});
        res.status(200).json(toppings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching toppings' });
    }
};

// Add a new topping
exports.addTopping = async (req, res) => {
    const { name } = req.body;
    
    try {
        const existingTopping = await Topping.findOne({ name });
        if (existingTopping) {
            return res.status(400).json({ message: 'Topping already exists' });
        }

        const newTopping = new Topping({ name });
        await newTopping.save();
        res.status(201).json(newTopping);
    } catch (error) {
        res.status(500).json({ message: 'Error adding topping' });
    }
};

// Update an existing topping
exports.updateTopping = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    try {
        const existingTopping = await Topping.findOne({ name, _id: { $ne: id } }); // Check for duplicates excluding current ID
        if (existingTopping) {
            return res.status(400).json({ message: 'Topping already exists' });
        }

        const updatedTopping = await Topping.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedTopping) {
            return res.status(404).json({ message: 'Topping not found' });
        }
        res.status(200).json(updatedTopping);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating topping' });
    }
};

// Delete a topping
exports.deleteTopping = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTopping = await Topping.findByIdAndDelete(id);
        if (!deletedTopping) {
            return res.status(404).json({ message: 'Topping not found' });
        }
        res.status(200).json({ message: 'Topping deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting topping' });
    }
};

// Get a topping by ID
exports.getToppingById = async (req, res) => {
    const { id } = req.params;

    try {
        const topping = await Topping.findById(id);
        if (!topping) {
            return res.status(404).json({ message: 'Topping not found' });
        }
        res.status(200).json(topping);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching topping' });
    }
};
