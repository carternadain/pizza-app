import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PizzaList from './components/PizzaList';
import ToppingsList from './components/ToppingsList';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/pizzas" element={<PizzaList />} />
          <Route path="/toppings" element={<ToppingsList />} />
          <Route path="/" element={<h1>Welcome to the Pizza App</h1>} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
