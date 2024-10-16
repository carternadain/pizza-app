const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Don't need dotenv in production; Heroku injects env vars automatically
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // Load env vars for local development only
}

// Import routes
const toppingsRouter = require('./routes/toppings');
const pizzaRoutes = require('./routes/pizzas');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173', // Vite local dev
  'https://cryptic-thicket-49174-8acbdfd07325.herokuapp.com', // Updated Heroku frontend URL
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Apply CORS options

// Middleware
app.use(bodyParser.json());

// Mongoose connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pizza-app';
mongoose.connect(MONGODB_URI)
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
