const express = require('express');

const mongoose = require('mongoose');
const path = require('path'); // For serving static files
const toppingsRouter = require('./routes/toppings'); // Toppings routes
const pizzaRoutes = require('./routes/pizzas'); // Pizza routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ 
  origin: 'https://cryptic-thicket-49174-8acbdfd07325.herokuapp.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials:true
}));


// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection string
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pizza-app';
const mongoURI = 'mongodb+srv://carternadain:Na0SpAzcK462kVT4@cluster0.3xorw.mongodb.net/Cluster0?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connection established successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

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
