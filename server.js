const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path'); // For serving static files
const toppingsRouter = require('./routes/toppings'); // Toppings routes
const pizzaRoutes = require('./routes/pizzas'); // Pizza routes

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

// Routes for toppings and pizzas
app.use('/api/toppings', toppingsRouter);
app.use('/api/pizzas', pizzaRoutes);


if (process.env.NODE_ENV === 'production') {
  // Serve React dist folder
  app.use(express.static(path.join(__dirname, 'pizza-app-frontend/dist')));

  // Serve index.html for all other routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pizza-app-frontend', 'dist', 'index.html'));
  });
}


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
