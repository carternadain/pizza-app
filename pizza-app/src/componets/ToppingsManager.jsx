import React, { useState, useEffect } from 'react';
import { getToppings, addTopping, deleteTopping } from '../services/toppingService';

function ToppingsManager() {
  const [toppings, setToppings] = useState([]);
  const [newTopping, setNewTopping] = useState("");

  useEffect(() => {
    loadToppings();
  }, []);

  const loadToppings = async () => {
    const data = await getToppings();
    setToppings(data);
  };

  const handleAddTopping = async () => {
    if (!newTopping) return;
    await addTopping({ name: newTopping });
    setNewTopping('');
    loadToppings();
  };

  const handleDeleteTopping = async (id) => {
    await deleteTopping(id);
    loadToppings();
  };

  return (
    <div>
      <h2>Manage Toppings</h2>
      <ul>
        {toppings.map(topping => (
          <li key={topping._id}>
            {topping.name} <button onClick={() => handleDeleteTopping(topping._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input 
        value={newTopping} 
        onChange={(e) => setNewTopping(e.target.value)} 
        placeholder="Add new topping" 
      />
      <button onClick={handleAddTopping}>Add Topping</button>
    </div>
  );
}

export default ToppingsManager;
