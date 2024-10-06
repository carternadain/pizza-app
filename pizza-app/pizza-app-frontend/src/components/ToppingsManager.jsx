import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ToppingManager = () => {
    const [toppings, setToppings] = useState([]);
    const [newTopping, setNewTopping] = useState('');
    const [editTopping, setEditTopping] = useState({ id: '', name: '' });

    useEffect(() => {
        // Fetch toppings on component mount
        fetchToppings();
    }, []);

    const fetchToppings = async () => {
        try {
            const response = await axios.get('/api/toppings');
            setToppings(response.data);
        } catch (error) {
            console.error('Error fetching toppings', error);
        }
    };

    const addTopping = async () => {
        try {
            await axios.post('/api/toppings', { name: newTopping });
            fetchToppings(); // Refresh the list
            setNewTopping(''); // Clear input
        } catch (error) {
            console.error('Error adding topping', error);
        }
    };

    const deleteTopping = async (id) => {
        try {
            await axios.delete(`/api/toppings/${id}`);
            fetchToppings(); // Refresh the list
        } catch (error) {
            console.error('Error deleting topping', error);
        }
    };

    const updateTopping = async () => {
        try {
            await axios.put(`/api/toppings/${editTopping.id}`, { name: editTopping.name });
            fetchToppings(); // Refresh the list
            setEditTopping({ id: '', name: '' }); // Clear input
        } catch (error) {
            console.error('Error updating topping', error);
        }
    };

    return (
        <div>
            <h1>Manage Toppings</h1>

            {/* Add new topping */}
            <input 
                type="text" 
                value={newTopping} 
                onChange={(e) => setNewTopping(e.target.value)} 
                placeholder="New Topping"
            />
            <button onClick={addTopping}>Add Topping</button>

            {/* List of toppings */}
            <ul>
                {toppings.map((topping) => (
                    <li key={topping._id}>
                        {topping.name} 
                        <button onClick={() => deleteTopping(topping._id)}>Delete</button>
                        <button onClick={() => setEditTopping({ id: topping._id, name: topping.name })}>Edit</button>
                    </li>
                ))}
            </ul>

            {/* Update existing topping */}
            {editTopping.id && (
                <div>
                    <input 
                        type="text" 
                        value={editTopping.name} 
                        onChange={(e) => setEditTopping({ ...editTopping, name: e.target.value })} 
                    />
                    <button onClick={updateTopping}>Update Topping</button>
                </div>
            )}
        </div>
    );
};

export default ToppingManager;
