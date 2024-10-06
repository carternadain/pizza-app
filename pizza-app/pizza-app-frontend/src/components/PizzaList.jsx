import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch pizzas from the backend API
    axios.get('http://localhost:5000/api/pizzas')
      .then((response) => {
        console.log('API Response:', response.data);
        setPizzas(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pizzas:', error);
        setError('Failed to fetch pizzas. Please try again later.');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!pizzas.length) {
    return <div>No pizzas available</div>;
  }

  return (
    <div>
      <h2>Pizza Menu</h2>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.id}>
            {pizza.name} - Ingredients: {pizza.ingredients.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PizzaList;
