import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PizzaManager = () => {
    const [pizzas, setPizzas] = useState([]);
    const [newPizza, setNewPizza] = useState('');
    const [editPizza, setEditPizza] = useState({ id: '', name: '' });

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/pizzas'); // Updated to use correct port
                const data = await response.json();
                setPizzas(data);
            } catch (error) {
                console.error('Error fetching pizzas:', error);
            }
        };
        fetchPizzas();
    }, []);
    
    const fetchPizzas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/pizzas'); // Updated to use correct port
            setPizzas(response.data);
        } catch (error) {
            console.error('Error fetching pizzas:', error);
        }
    };
    
    const addPizza = async () => {
        try {
            await axios.post('http://localhost:5000/api/pizzas', { name: newPizza }); // Updated to use correct port
            fetchPizzas(); // Refresh the list
            setNewPizza(''); // Clear input
        } catch (error) {
            console.error('Error adding pizza:', error);
        }
    };
    
    const deletePizza = async (id) => {
        console.log(id); // Log the ID to see if it's valid
        try {
          await axios.delete(`http://localhost:5000/api/pizzas/${id}`);
          fetchPizzas();
        } catch (error) {
          console.error('Error deleting pizza:', error);
        }
      };
      
    
    const updatePizza = async () => {
        try {
            await axios.put(`http://localhost:5000/api/pizzas/${editPizza.id}`, { name: editPizza.name }); // Updated to use correct port
            fetchPizzas(); // Refresh the list
            setEditPizza({ id: '', name: '' }); // Clear input
        } catch (error) {
            console.error('Error updating pizza:', error);
        }
    };
    
    return (
        <div>
            <h1>Manage Pizzas</h1>

            {/* Add new pizza */}
            <input
                type="text"
                value={newPizza}
                onChange={(e) => setNewPizza(e.target.value)}
                placeholder="New Pizza"
            />
            <button onClick={addPizza}>Add Pizza</button>

            {/* List of pizzas */}
            <ul>
                {pizzas.map((pizza) => (
                    <li key={pizza._id}>
                        {pizza.name}
                        <button onClick={() => deletePizza(pizza._id)}>Delete</button>
                        <button onClick={() => setEditPizza({ id: pizza._id, name: pizza.name })}>Edit</button>
                    </li>
                ))}
            </ul>

            {/* Update existing pizza */}
            {editPizza.id && (
                <div>
                    <input
                        type="text"
                        value={editPizza.name}
                        onChange={(e) => setEditPizza({ ...editPizza, name: e.target.value })}
                    />
                    <button onClick={updatePizza}>Update Pizza</button>
                </div>
            )}
        </div>
    );
};

export default PizzaManager;
