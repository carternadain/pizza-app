// src/components/ToppingsList.jsx
import React, { useState, useEffect } from 'react';

const ToppingsList = () => {
  const [toppings, setToppings] = useState([]);
  const [newTopping, setNewTopping] = useState('');
  const [editingTopping, setEditingTopping] = useState(null);
  const [updatedTopping, setUpdatedTopping] = useState('');

  // Fetch existing toppings from the backend
  // Fetch existing toppings from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/toppings')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the fetched data
        setToppings(data); // Assuming 'data' is an array of toppings
      })
      .catch((error) => console.error('Error fetching toppings:', error));
  }, []);

  // Add a new topping
  const addTopping = () => {
    if (newTopping.trim() === '') return;

    fetch('http://localhost:5000/api/toppings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTopping }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setToppings([...toppings, data]);
        setNewTopping('');
      })
      .catch((error) => console.error('Error adding topping:', error));
  };

  // Update an existing topping
  const updateTopping = (id) => {
    if (!id) {
      console.error('Topping ID is undefined. Cannot update topping.');
      return;
    }
    
    if (updatedTopping.trim() === '') return;

    fetch(`http://localhost:5000/api/toppings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: updatedTopping }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setToppings(toppings.map((topping) => 
          topping._id === id ? { ...topping, name: updatedTopping } : topping
        ));
        setEditingTopping(null);
        setUpdatedTopping('');
      })
      .catch((error) => {
        console.error('Error updating topping:', error);
        alert('Failed to update topping. Please try again later.');
      });
  };

  // Delete a topping
  const deleteTopping = (id) => {
    if (!id) {
      console.error('Topping ID is undefined. Cannot delete topping.');
      return;
    }

    fetch(`http://localhost:5000/api/toppings/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setToppings(toppings.filter((topping) => topping._id !== id));
      })
      .catch((error) => console.error('Error deleting topping:', error));
  };

  return (
    <div>
      <h2>Manage Toppings</h2>

      {/* Form to add a new topping */}
      <div>
        <input
          type="text"
          value={newTopping}
          onChange={(e) => setNewTopping(e.target.value)}
          placeholder="Add new topping"
        />
        <button onClick={addTopping}>Add Topping</button>
      </div>

      {/* List of existing toppings */}
      <ul>
        {toppings.map((topping) => (
          <li key={topping._id}> {/* Ensure unique key for each topping */}
            {editingTopping === topping.id ? (
              <>
                <input
                  type="text"
                  value={updatedTopping}
                  onChange={(e) => setUpdatedTopping(e.target.value)}
                  placeholder="Update topping"
                />
                  <button onClick={() => updateTopping(topping._id)}>Update</button>
              </>
            ) : (
              <>
                {topping.name}
                <button onClick={() => setEditingTopping(topping.id)}>Edit</button>
                <button onClick={() => deleteTopping(topping._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToppingsList;
