const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const toppingsRouter = require('./routes/toppings');
const pizzasRouter = require('./routes/pizzas');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Routes
app.use('/api/toppings', toppingsRouter);
app.use('/api/pizzas', pizzasRouter);

module.exports = app;
