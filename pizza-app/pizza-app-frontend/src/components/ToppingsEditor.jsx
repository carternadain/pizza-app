import React from 'react';

const ToppingsEditor = ({ pizzaToppings, availableToppings, handleToppingChange, updatePizzaToppings }) => {
    // Get toppings that can be added (not already on the pizza)
    const toppingsToAdd = availableToppings.filter(
        (topping) => !pizzaToppings.includes(topping._id)
    );

    return (
        <div className="mt-4">
            <h4>Edit Toppings for Pizza</h4>
            <div className="row">
                {/* Current Toppings Box */}
                <div className="col-md-6">
                    <h5>Current Toppings</h5>
                    <ul className="list-group">
                        {pizzaToppings.map((toppingId) => {
                            // Find the topping by ID, if not found return null to avoid "Unknown Topping"
                            const topping = availableToppings.find((t) => t._id === toppingId);
                            if (!topping) return null; // Avoid rendering unknown toppings
                            
                            return (
                                <li key={toppingId} className="list-group-item d-flex justify-content-between align-items-center">
                                    {topping.name}
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleToppingChange(toppingId)} // Remove topping
                                    >
                                        Remove
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Available Toppings Box */}
                <div className="col-md-6">
                    <h5>Available Toppings to Add</h5>
                    <ul className="list-group">
                        {toppingsToAdd.map((topping) => (
                            <li key={topping._id} className="list-group-item d-flex justify-content-between align-items-center">
                                {topping.name}
                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => handleToppingChange(topping._id)} // Add topping
                                >
                                    Add
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-3">
                <button className="btn btn-primary" onClick={updatePizzaToppings}>
                    Save Toppings
                </button>
            </div>
        </div>
    );
};

export default ToppingsEditor;
