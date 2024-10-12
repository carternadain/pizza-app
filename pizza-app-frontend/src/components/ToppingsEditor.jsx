import React from 'react';

const ToppingsEditor = ({ pizzaToppings = [], availableToppings = [], handleToppingChange }) => {
    // Filter out invalid topping IDs
    const cleanedPizzaToppings = pizzaToppings.filter(Boolean);

    // Get toppings that can be added (not already on the pizza)
    const toppingsToAdd = availableToppings.filter(
        (topping) => !cleanedPizzaToppings.includes(topping._id)
    );

    const handleAddTopping = (toppingId) => {
        if (!cleanedPizzaToppings.includes(toppingId)) {
            const newToppings = [...cleanedPizzaToppings, toppingId];
            console.log('Adding topping:', toppingId);
            handleToppingChange(newToppings);
        }
    };

    const handleRemoveTopping = (toppingId) => {
        const newToppings = cleanedPizzaToppings.filter(id => id !== toppingId);
        console.log('Removing topping:', toppingId);
        handleToppingChange(newToppings);
    };

    return (
        <div className="mt-4">
            <h4>Edit Toppings for Pizza</h4>
            <div className="row">
                {/* Current Toppings Box */}
                <div className="col-md-6">
                    <h5>Current Toppings</h5>
                    <ul className="list-group">
                        {cleanedPizzaToppings.length > 0 ? (
                            cleanedPizzaToppings.map((toppingId) => {
                                const id = typeof toppingId === 'object' ? toppingId._id : toppingId;
                                const topping = availableToppings.find((t) => t._id === id);

                                if (!topping) return null; // Skip if topping not found

                                return (
                                    <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {topping.name}
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleRemoveTopping(id)}
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

                {/* Available Toppings Box */}
                <div className="col-md-6">
                    <h5>Available Toppings to Add</h5>
                    <ul className="list-group">
                        {toppingsToAdd.length > 0 ? (
                            toppingsToAdd.map((topping) => (
                                <li key={topping._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {topping.name}
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleAddTopping(topping._id)}
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
        </div>
    );
};

export default ToppingsEditor;
