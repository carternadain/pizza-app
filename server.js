const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // For serving static files
const cors = require('cors'); // Added CORS import
const toppingsRouter = require('./routes/toppings'); // Toppings routes
const pizzaRoutes = require('./routes/pizzas'); // Pizza routes

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for allowing requests from your frontend
app.use(cors({ 
  origin: 'https://cryptic-thicket-49174-8acbdfd07325.herokuapp.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true
}));

// Middleware
app.use(express.json());

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pizza-app';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB connection established successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes for toppings and pizzas
app.use('/api/toppings', toppingsRouter);
app.use('/api/pizzas', pizzaRoutes);

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app in production
  app.use(express.static(path.join(__dirname, 'pizza-app-frontend/dist')));

  // Serve index.html for all other routes (React SPA)
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pizza-app-frontend', 'dist', 'index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
