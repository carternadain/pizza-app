import React, { useState } from 'react';

const ToppingsEditor = ({ pizzaToppings = [], availableToppings = [], handleToppingChange, updatePizzaToppings }) => {
    const [successMessage, setSuccessMessage] = useState('');

    const cleanedPizzaToppings = pizzaToppings.filter(Boolean);
    const toppingsToAdd = availableToppings.filter(
        (topping) => !cleanedPizzaToppings.includes(topping._id)
    );

    const handleSaveToppings = async () => {
        try {
            const uniqueToppings = [...new Set(cleanedPizzaToppings)];
            await updatePizzaToppings(uniqueToppings);
            setSuccessMessage('Toppings updated successfully!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 1500);
        } catch (error) {
            console.error('Failed to update toppings:', error);
            setSuccessMessage('Failed to update toppings. Please try again.');
        }
    };

    return (
        <div className="mt-4">
            <h4>Edit Toppings for Pizza</h4>
            <div className="row">
                <div className="col-md-6">
                    <h5>Current Toppings</h5>
                    <ul className="list-group">
                        {cleanedPizzaToppings.length > 0 ? (
                            cleanedPizzaToppings.map((toppingId) => {
                                const id = typeof toppingId === 'object' ? toppingId._id : toppingId;
                                const topping = availableToppings.find((t) => t._id === id);
                                if (!topping) return null;

                                return (
                                    <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {topping.name}
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleToppingChange(cleanedPizzaToppings.filter(t => t !== id))}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                );
                            })
                        ) : (
                            <li className="list-group-item">No current toppings.</li>
                        )}
                    </ul>
                </div>

                <div className="col-md-6">
                    <h5>Available Toppings to Add</h5>
                    <ul className="list-group">
                        {toppingsToAdd.length > 0 ? (
                            toppingsToAdd.map((topping) => (
                                <li key={topping._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {topping.name}
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => {
                                            const newToppings = [...cleanedPizzaToppings, topping._id];
                                            handleToppingChange(newToppings);
                                        }}
                                    >
                                        Add
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="list-group-item">No toppings available to add.</li>
                        )}
                    </ul>
                </div>
            </div>

            <div className="mt-3">
                <button className="btn btn-primary" onClick={handleSaveToppings}>
                    Save Toppings
                </button>
            </div>

            {successMessage && (
                <div className="mt-3 alert alert-info">
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default ToppingsEditor;
