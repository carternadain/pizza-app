import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PizzaList from './components/PizzaList';
import ToppingsList from './components/ToppingsList';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/pizzas">Pizzas</Link> | 
        <Link to="/toppings">Toppings</Link>
      </nav>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<h1>Welcome to Pizza App</h1>} />
        
        {/* Pizza List Route */}
        <Route path="/pizzas" element={<PizzaList />} />
        
        {/* Toppings List Route */}
        <Route path="/toppings" element={<ToppingsList />} />
        
        {/* Catch-all Route for 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
