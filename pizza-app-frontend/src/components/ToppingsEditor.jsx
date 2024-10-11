import React from 'react';

const ToppingsEditor = ({ pizzaToppings = [], availableToppings = [], handleToppingChange, updatePizzaToppings }) => {
    // Log the props to see what's being passed
    console.log('pizzaToppings:', pizzaToppings);
    console.log('availableToppings:', availableToppings);

    // Get toppings that can be added (not already on the pizza)
    const toppingsToAdd = availableToppings.filter(
        (topping) => !pizzaToppings.includes(topping._id)
    );

    // Log the filtered toppings to add
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
                                // Log each toppingId
                                console.log('toppingId:', toppingId);

                                // Find the topping by ID, if not found return null to avoid "Unknown Topping"
                                const topping = availableToppings.find((t) => t._id === toppingId);
                                if (!topping) {
                                    console.log(`Topping with ID ${toppingId} not found in availableToppings`);
                                    return null;
                                }

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
                                // Log each available topping to be added
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
