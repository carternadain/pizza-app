import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Replace with Heroku backend URL
const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://cryptic-thicket-49174-8acbdfd07325.herokuapp.com';

const ToppingsList = () => {
  const [toppings, setToppings] = useState([]);
  const [newTopping, setNewTopping] = useState('');
  const [editingTopping, setEditingTopping] = useState(null);
  const [updatedTopping, setUpdatedTopping] = useState('');
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(`${API_URL}/api/toppings`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data received from API:', data); // Add this log
        if (Array.isArray(data)) {
          setToppings(data);
        } else {
          throw new Error('Received data is not an array.');
        }
      })
      .catch((error) => {
        setError('Error fetching toppings.');
        console.error('Error fetching toppings:', error); // Log the error
      });
  }, [API_URL]);

  const addTopping = () => {
    const formattedTopping = newTopping.trim().toLowerCase();
    const isDuplicate = toppings.some((topping) => topping.name.toLowerCase() === formattedTopping);

    if (formattedTopping === '') {
      alert("Topping name can't be empty.");
      return;
    }

    if (isDuplicate) {
      alert("This topping already exists. Please enter a different topping.");
      return;
    }

    fetch(`${API_URL}/api/toppings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTopping }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add topping.');
        }
        return response.json();
      })
      .then((data) => {
        setToppings([...toppings, data]);
        setNewTopping('');
      })
      .catch((error) => {
        setError('Error adding topping.');
        console.error('Error adding topping:', error);
      });
  };

  const updateTopping = (id) => {
    if (!id || updatedTopping.trim() === '') return;

    fetch(`${API_URL}/api/toppings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: updatedTopping }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update topping.');
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
        setError('Error updating topping.');
        console.error('Error updating topping:', error);
      });
  };

  const deleteTopping = (id) => {
    if (!id) return;

    fetch(`${API_URL}/api/toppings/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete topping.');
        }
        setToppings(toppings.filter((topping) => topping._id !== id));
      })
      .catch((error) => {
        setError('Error deleting topping.');
        console.error('Error deleting topping:', error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Toppings</h2>

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

      <ul className="list-group">
        {toppings.length > 0 ? (
          toppings.map((topping) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={topping._id}>
              {editingTopping === topping._id ? (
                <>
                  <input
                    type="text"
                    className="form-control me-2"
                    value={updatedTopping}
                    onChange={(e) => setUpdatedTopping(e.target.value)}
                  />
                  <button className="btn btn-success btn-sm" onClick={() => updateTopping(topping._id)}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  {topping.name}
                  <div>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => {
                        setEditingTopping(topping._id);
                        setUpdatedTopping(topping.name);
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
          ))
        ) : (
          <li className="list-group-item">No toppings found.</li>
        )}
      </ul>
    </div>
  );
};

export default ToppingsList;
