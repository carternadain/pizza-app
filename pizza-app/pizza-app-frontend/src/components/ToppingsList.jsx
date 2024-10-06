import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ToppingsList = () => {
  const [toppings, setToppings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch toppings from the backend API
    axios.get('http://localhost:5000/api/toppings')
      .then((response) => {
        console.log('API Response:', response.data);
        setToppings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching toppings:', error);
        setError('Failed to fetch toppings. Please try again later.');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!toppings.length) {
    return <div>No toppings available</div>;
  }

  return (
    <div>
      <h2>Available Toppings</h2>
      <ul>
        {toppings.map((topping) => (
          <li key={topping.id}>
            {topping.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToppingsList;
