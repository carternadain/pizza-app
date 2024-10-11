import React from 'react';

const ToppingsEditor = ({ pizzaToppings = [], availableToppings = [], handleToppingChange, updatePizzaToppings }) => {
    console.log('pizzaToppings:', pizzaToppings);
    console.log('availableToppings:', availableToppings);

    // Get toppings that can be added (not already on the pizza)
    const toppingsToAdd = availableToppings.filter(
        (topping) => !pizzaToppings.includes(topping._id)
    );

    console.log('toppingsToAdd:', toppingsToAdd);

    return (
        <div className="mt-4">
            <h4>Edit Toppings for Pizza</h4>
            <div className="row">
                {/* Current Toppings Box */}
                <div className="col-md-6">
                    <h5>Current Toppings</h5>
                    <ul className="list-group">
                        {pizzaToppings.length > 0 ? (
                            pizzaToppings.map((toppingId) => {
                                // Ensure the toppingId is always a string
                                const id = typeof toppingId === 'object' ? toppingId._id : toppingId;

                                console.log('toppingId:', id);

                                // Find the topping by ID; if not found, log a message
                                const topping = availableToppings.find((t) => t._id === id);
                                if (!topping) {
                                    console.log(`Topping with ID ${id} not found in availableToppings`);
                                    return null; // Return null if topping not found
                                }

                                return (
                                    <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {topping.name}
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleToppingChange(id)} // Remove topping
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
                            toppingsToAdd.map((topping) => {
                                console.log('Available topping to add:', topping);

                                return (
                                    <li key={topping._id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {topping.name}
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleToppingChange(topping._id)} // Add topping
                                        >
                                            Add
                                        </button>
                                    </li>
                                );
                            })
                        ) : (
                            <li className="list-group-item">No toppings available to add.</li>
                        )}
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
