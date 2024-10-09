import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PizzaList from './components/PizzaList';
import ToppingsList from './components/ToppingsList';

function App() {
  return (
    <Router>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Pizza App</Link>
          <div className="collapse navbar-collapse justify-content-center">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pizzas">Pizzas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/toppings">Toppings</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        {/* Home Page Route update */}
        <Route 
          path="/" 
          element={
            <div className="d-flex align-items-center justify-content-center vh-100">
              <h1 className="text-center">Welcome to the Pizza App 🍕 </h1>
            </div>
          } 
        />
        
        {/* Pizza List Route */}
        <Route path="/pizzas" element={<PizzaList />} />
        
        {/* Toppings List Route */}
        <Route path="/toppings" element={<ToppingsList />} />
        
        {/* Catch-all Route for 404 */}
        <Route path="*" element={<h1 className="text-center mt-5">404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
