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
            setPizzas(response.data);
        } catch (error) {
            console.error('Error fetching pizzas:', error);
        }
    };

    const fetchToppings = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/toppings`);
            setAvailableToppings(response.data);
        } catch (error) {
            console.error('Error fetching toppings:', error);
        }
    };

    const updatePizza = async () => {
        if (!editPizza.name.trim()) return;
        try {
            await axios.put(`${API_URL}/api/pizzas/${editPizza.id}`, {
                name: editPizza.name,
                toppings: editPizza.toppings,
            });
            fetchPizzas();
            setEditPizza({ id: '', name: '', toppings: [] });
        } catch (error) {
            console.error('Error updating pizza:', error);
        }
    };

    const handleToppingChange = (newToppings) => {
        setEditPizza((prev) => ({ ...prev, toppings: newToppings }));
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
                <button className="btn btn-primary" onClick={() => addPizza()}>
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
                    <input
                        type="text"
                        className="form-control mb-3"
                        value={editPizza.name}
                        onChange={(e) => setEditPizza({ ...editPizza, name: e.target.value })}
                        placeholder="Edit pizza name"
                    />
                    <ToppingsEditor
                        pizzaToppings={editPizza.toppings}
                        availableToppings={availableToppings}
                        handleToppingChange={handleToppingChange}
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
