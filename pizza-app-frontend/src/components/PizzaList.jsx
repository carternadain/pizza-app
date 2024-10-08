import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToppingsEditor from './ToppingsEditor';

const PizzaManager = () => {
  const [pizzas, setPizzas] = useState([]);
  const [newPizza, setNewPizza] = useState('');
  const [editPizza, setEditPizza] = useState({ id: '', name: '', toppings: [] });
  const [availableToppings, setAvailableToppings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPizzas();
      await fetchToppings();
    };
    fetchData();
  }, []);

  const fetchPizzas = async () => {
    try {
      const response = await axios.get(`${process.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/pizzas`, { params: { timestamp: new Date().getTime() } });
      setPizzas(response.data);
    } catch (error) {
      console.error('Error fetching pizzas:', error);
    }
  };

  const fetchToppings = async () => {
    try {
      const response = await axios.get(`${process.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/toppings`);
      setAvailableToppings(response.data);
    } catch (error) {
      console.error('Error fetching toppings:', error);
    }
  };

  const addPizza = async () => {
    if (!newPizza.trim()) return;
    try {
      await axios.post(`${process.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/pizzas`, { name: newPizza });
      fetchPizzas();
      setNewPizza('');
    } catch (error) {
      console.error('Error adding pizza:', error);
    }
  };

  const deletePizza = async (id) => {
    try {
      await axios.delete(`${process.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/pizzas/${id}`);
      fetchPizzas();
    } catch (error) {
      console.error('Error deleting pizza:', error);
    }
  };

  const updatePizza = async () => {
    if (!editPizza.name.trim()) return;
    try {
      await axios.put(`${process.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/pizzas/${editPizza.id}`, { name: editPizza.name });
      fetchPizzas();
      setEditPizza({ id: '', name: '', toppings: [] });
    } catch (error) {
      console.error('Error updating pizza:', error);
    }
  };

  const updatePizzaToppings = async () => {
    const uniqueToppings = [...new Set(editPizza.toppings.map(topping => {
      return typeof topping === 'string' ? topping : topping._id;
    }))];
    try {
      const response = await axios.put(`${process.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/pizzas/${editPizza.id}/toppings`, { toppings: uniqueToppings });
      fetchPizzas();
      setEditPizza({ id: '', name: '', toppings: [] });
      alert('Pizza toppings updated successfully!');
    } catch (error) {
      console.error('Error updating pizza toppings:', error.response?.data || error.message);
      alert('Failed to update pizza toppings. Please try again.');
    }
  };

  const handleToppingChange = (toppingId) => {
    setEditPizza((prev) => {
      const isSelected = prev.toppings.includes(toppingId);
      const updatedToppings = isSelected
        ? prev.toppings.filter((id) => id !== toppingId)
        : [...prev.toppings, toppingId];
      return { ...prev, toppings: updatedToppings };
    });
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Manage Pizzas</h2>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newPizza}
          onChange={(e) => setNewPizza(e.target.value)}
          placeholder="Add new pizza"
        />
        <button className="btn btn-primary" onClick={addPizza}>
          Add Pizza
        </button>
      </div>

      <ul className="list-group">
        {pizzas.map((pizza) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={pizza._id}>
            {editPizza.id === pizza._id ? (
              <>
                <input
                  type="text"
                  className="form-control me-2"
                  value={editPizza.name}
                  onChange={(e) => setEditPizza({ ...editPizza, name: e.target.value })}
                />
                <button className="btn btn-success btn-sm" onClick={updatePizza}>
                  Save
                </button>
              </>
            ) : (
              <>
                {pizza.name}
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setEditPizza({ id: pizza._id, name: pizza.name, toppings: pizza.toppings })}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deletePizza(pizza._id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {editPizza.id && (
        <ToppingsEditor
          toppings={availableToppings}
          selectedToppings={editPizza.toppings}
          onToppingChange={handleToppingChange}
          onUpdateToppings={updatePizzaToppings}
        />
      )}
    </div>
  );
};

export default PizzaManager;
