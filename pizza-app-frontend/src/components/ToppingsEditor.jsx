import React from 'react';

const ToppingsEditor = ({ pizzaToppings = [], availableToppings = [], handleToppingChange }) => {
    // Normalize pizzaToppings to be an array of IDs
    const cleanedPizzaToppings = pizzaToppings.map((topping) =>
        typeof topping === 'object' && topping._id ? topping._id : topping
    );

    // Get toppings that can be added (not already on the pizza)
    const toppingsToAdd = availableToppings.filter(
        (topping) => !cleanedPizzaToppings.includes(topping._id)
    );

    const handleAddTopping = (toppingId) => {
        if (!cleanedPizzaToppings.includes(toppingId)) { // Avoid duplicates
            const newToppings = [...cleanedPizzaToppings, toppingId];
            handleToppingChange(newToppings);
        }
    };

    const handleRemoveTopping = (toppingId) => {
        const newToppings = cleanedPizzaToppings.filter(id => id !== toppingId);
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
                                const topping = availableToppings.find((t) => t._id === toppingId);

                                if (!topping) {
                                    console.warn('Topping not found in availableToppings:', toppingId);
                                    return null;
                                }

                                return (
                                    <li key={toppingId} className="list-group-item d-flex justify-content-between align-items-center">
                                        {topping.name}
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleRemoveTopping(toppingId)}
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
