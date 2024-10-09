const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Topping = require('./models/Toppings'); 
const pizzaRoutes = require('./routes/pizzas'); 
const path = require('path'); // For serving static files

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pizza-app';

// Connect to MongoDB (using either Atlas or local)
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Toppings routes
app.get('/api/toppings', async (req, res) => {
  try {
    const toppings = await Topping.find();
    res.json(toppings);
  } catch (error) {
    console.error('Error fetching toppings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to add a new topping
app.post('/api/toppings', async (req, res) => {
  try {
    const newTopping = new Topping(req.body);
    const savedTopping = await newTopping.save();
    res.status(201).json(savedTopping);
  } catch (error) {
    console.error('Error adding topping:', error);
    res.status(400).json({ message: 'Bad request' });
  }
});

// Route to update a topping
app.put('/api/toppings/:id', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: 'Topping name is required' });
    }

    const updatedTopping = await Topping.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedTopping) {
      return res.status(404).json({ message: 'Topping not found' });
    }
    res.json(updatedTopping);
  } catch (error) {
    console.error('Error updating topping:', error);
    res.status(400).json({ message: 'Bad request', error: error.message });
  }
});

// Route to delete a topping
app.delete('/api/toppings/:id', async (req, res) => {
  try {
    const deletedTopping = await Topping.findByIdAndDelete(req.params.id);
    if (!deletedTopping) {
      return res.status(404).json({ message: 'Topping not found' });
    }
    res.sendStatus(204); // No content
  } catch (error) {
    console.error('Error deleting topping:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Pizza routes
app.use('/api/pizzas', pizzaRoutes);

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
