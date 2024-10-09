import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

const ToppingsList = () => {
  const [toppings, setToppings] = useState([]);
  const [newTopping, setNewTopping] = useState('');
  const [editingTopping, setEditingTopping] = useState(null); // Store the ID of the topping being edited
  const [updatedTopping, setUpdatedTopping] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/toppings')
      .then((response) => response.json())
      .then((data) => setToppings(data))
      .catch((error) => console.error('Error fetching toppings:', error));
  }, []);

  const addTopping = () => {
    // Trim the input and check for duplicates (case-insensitive)
    const formattedTopping = newTopping.trim().toLowerCase();
    const isDuplicate = toppings.some((topping) => topping.name.toLowerCase() === formattedTopping);

    if (formattedTopping === '') {
      alert("Topping name can't be empty.");
      return;
    }

    if (isDuplicate) {
      alert("This topping already exists. Please enter a different topping.");
      return;  // Stop the function if it's a duplicate
    }

    // If it's not a duplicate, proceed with the fetch request to add the topping
    fetch('http://localhost:5000/api/toppings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTopping }),
    })
      .then((response) => response.json())
      .then((data) => {
        setToppings([...toppings, data]);
        setNewTopping('');  // Clear input after adding
      })
      .catch((error) => console.error('Error adding topping:', error));
  };

  const updateTopping = (id) => {
    if (!id || updatedTopping.trim() === '') return;

    fetch(`http://localhost:5000/api/toppings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: updatedTopping }),
    })
      .then((response) => response.json())
      .then(() => {
        setToppings(toppings.map((topping) =>
          topping._id === id ? { ...topping, name: updatedTopping } : topping
        ));
        setEditingTopping(null);  // Reset editing mode after updating
        setUpdatedTopping('');
      })
      .catch((error) => console.error('Error updating topping:', error));
  };

  const deleteTopping = (id) => {
    if (!id) return;

    fetch(`http://localhost:5000/api/toppings/${id}`, { method: 'DELETE' })
      .then(() => {
        setToppings(toppings.filter((topping) => topping._id !== id));
      })
      .catch((error) => console.error('Error deleting topping:', error));
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Manage Toppings</h2>

      {/* Form to add a new topping */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newTopping}
          onChange={(e) => setNewTopping(e.target.value)}
          placeholder="Add new topping"
        />
        <button className="btn btn-primary" onClick={addTopping}>
          Add Topping
        </button>
      </div>

      {/* List of existing toppings */}
      <ul className="list-group">
        {toppings.map((topping) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={topping._id}>
            {editingTopping === topping._id ? (
              <>
                <input
                  type="text"
                  className="form-control me-2"
                  value={updatedTopping}
                  onChange={(e) => setUpdatedTopping(e.target.value)}
                  placeholder="Update topping"
                />
                <button className="btn btn-success btn-sm" onClick={() => updateTopping(topping._id)}>
                  Update
                </button>
              </>
            ) : (
              <>
                {topping.name}
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setEditingTopping(topping._id); // 
                      setUpdatedTopping(topping.name); //
                    }}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTopping(topping._id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToppingsList;
