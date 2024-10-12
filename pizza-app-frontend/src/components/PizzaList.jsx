import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToppingsEditor from './ToppingsEditor';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'https://cryptic-thicket-49174-8acbdfd07325.herokuapp.com';

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
            const response = await axios.get(`${API_URL}/api/pizzas`, { params: { timestamp: new Date().getTime() } });
            console.log('API pizza response:', response.data);
            setPizzas(response.data);
            console.log('Fetched pizzas:', response.data);
        } catch (error) {
            console.error('Error fetching pizzas:', error);
        }
    };

    const fetchToppings = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/toppings`);
            console.log('API toppings response:', response.data);
            setAvailableToppings(response.data);
            console.log('Fetched toppings:', response.data);
        } catch (error) {
            console.error('Error fetching toppings:', error);
        }
    };

    const addPizza = async () => {
        if (!newPizza.trim()) return;
        try {
            await axios.post(`${API_URL}/api/pizzas`, { name: newPizza });
            fetchPizzas();
            setNewPizza('');
        } catch (error) {
            console.error('Error adding pizza:', error);
        }
    };

    const deletePizza = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/pizzas/${id}`);
            fetchPizzas();
        } catch (error) {
            console.error('Error deleting pizza:', error);
        }
    };

    const updatePizza = async () => {
        if (!editPizza.name.trim()) return;
        try {
            await axios.put(`${API_URL}/api/pizzas/${editPizza.id}`, {
                name: editPizza.name,
                toppings: editPizza.toppings,  // include toppings here
            });
            fetchPizzas();
            setEditPizza({ id: '', name: '', toppings: [] });
        } catch (error) {
            console.error('Error updating pizza:', error);
        }
    };

    const updatePizzaToppings = async (uniqueToppings) => {
        try {
            await axios.put(`${API_URL}/api/pizzas/${editPizza.id}`, {
                toppings: uniqueToppings,  // Save only unique toppings
            });
            fetchPizzas();  // Reload pizzas after saving toppings
            alert('Toppings successfully saved!'); // Notify the user
        } catch (error) {
            console.error('Error updating pizza toppings:', error);
            alert('Failed to save toppings.');
        }
    };
    
    const handleToppingChange = (newToppings) => {
        const cleanedToppings = newToppings.filter(Boolean); // Remove undefined values
        const uniqueToppings = [...new Set(cleanedToppings)]; // Ensure no duplicates
        console.log('Updated toppings:', uniqueToppings);

        setEditPizza((prev) => ({ ...prev, toppings: uniqueToppings }));
    };

    console.log('Current pizzas:', pizzas);
    console.log('Available toppings:', availableToppings);
    console.log('Selected pizza toppings:', editPizza.toppings);

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
                    <li key={pizza._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{pizza.name}</span>
                        <div>
                            <button
                                className="btn btn-info btn-sm me-2"
                                onClick={() => setEditPizza({ id: pizza._id, name: pizza.name, toppings: pizza.toppings })}
                            >
                                Edit
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => deletePizza(pizza._id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {editPizza.id && (
                <div className="mt-4">
                    <h3>Edit Pizza</h3>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={editPizza.name}
                            onChange={(e) => setEditPizza({ ...editPizza, name: e.target.value })}
                            placeholder="Edit pizza name"
                        />
                    </div>
                    <ToppingsEditor
                        pizzaToppings={editPizza.toppings}
                        availableToppings={availableToppings}
                        handleToppingChange={handleToppingChange}
                        updatePizzaToppings={updatePizzaToppings}
                    />
                    <div className="mt-3">
                        <button className="btn btn-primary" onClick={updatePizza}>
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PizzaManager;
