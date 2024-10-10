const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Loads environment variables from .env file

// Import routes
const toppingsRouter = require('./routes/toppings');
const pizzaRoutes = require('./routes/pizzas');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection string from environment variable
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error: ', err));

// Routes for toppings and pizzas
app.use('/api/toppings', toppingsRouter);
app.use('/api/pizzas', pizzaRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the frontend (Vite build output)
  app.use(express.static(path.join(__dirname, 'pizza-app-frontend/dist')));

  // Serve index.html for all other routes (for React Router)
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pizza-app-frontend', 'dist', 'index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
