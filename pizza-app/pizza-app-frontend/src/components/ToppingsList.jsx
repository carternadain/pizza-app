import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ToppingsList() {
  const [toppings, setToppings] = useState([]);

  useEffect(() => {
    axios.get('/api/toppings') // Ensure this API endpoint is correct
      .then(response => setToppings(response.data))
      .catch(error => console.error('Error fetching toppings:', error));
  }, []);

  const handleAddTopping = (newTopping) => {
    axios.post('/api/toppings', { name: newTopping })
      .then(() => setToppings([...toppings, newTopping]))
      .catch(error => console.error('Error adding topping:', error));
  };

  return (
    <div>
      <h2>Toppings List</h2>
      <ul>
        {toppings.map(topping => (
          <li key={topping.id}>{topping.name}</li>
        ))}
      </ul>
      <button onClick={() => handleAddTopping('New Topping')}>Add Topping</button>
    </div>
  );
}

export default ToppingsList;
