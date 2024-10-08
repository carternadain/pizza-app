import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

const ToppingsList = () => {
  const [toppings, setToppings] = useState([]);
  const [newTopping, setNewTopping] = useState('');
  const [editingTopping, setEditingTopping] = useState(null);
  const [updatedTopping, setUpdatedTopping] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/toppings')
      .then((response) => response.json())
      .then((data) => setToppings(data))
      .catch((error) => console.error('Error fetching toppings:', error));
  }, []);

  const addTopping = () => {
    if (newTopping.trim() === '') return;

    fetch('http://localhost:5000/api/toppings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTopping }),
    })
      .then((response) => response.json())
      .then((data) => {
        setToppings([...toppings, data]);
        setNewTopping('');
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
        setEditingTopping(null);
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
            {editingTopping === topping.id ? (
              <>
                <input
                  type="text"
                  className="form-control"
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
                  <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingTopping(topping.id)}>
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
