import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PizzaList() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    axios.get('/api/pizzas') // Ensure this API endpoint is correct
      .then(response => setPizzas(response.data))
      .catch(error => console.error('Error fetching pizzas:', error));
  }, []);

  return (
    <div>
      <h2>Pizza List</h2>
      <ul>
        {pizzas.map(pizza => (
          <li key={pizza.id}>{pizza.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PizzaList;
