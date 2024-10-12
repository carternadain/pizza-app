import React, { useState } from 'react';

const ToppingsEditor = ({ pizzaToppings = [], availableToppings = [], handleToppingChange, updatePizzaToppings }) => {
    const [successMessage, setSuccessMessage] = useState(''); // To handle success messages

    // Get toppings that can be added (not already on the pizza)
    const toppingsToAdd = availableToppings.filter(
        (topping) => !pizzaToppings.includes(topping._id)
    );

    const handleSaveToppings = async () => {
        try {
            await updatePizzaToppings(); // Assuming this is an async call to the backend to update toppings
            setSuccessMessage('Toppings updated successfully!'); // Show success message
            setTimeout(() => {
                window.location.reload(); // Reload the page after a short delay
            }, 1500); // Give a little time to show the success message
        } catch (error) {
            console.error('Failed to update toppings:', error);
            setSuccessMessage('Failed to update toppings. Please try again.');
        }
    };
    console.log('pizzaToppings (from props):', pizzaToppings);

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
                            // Extra debug logging
                            console.log('toppingId from pizzaToppings:', toppingId);
                            
                            // Ensure ID is always a string
                            const id = typeof toppingId === 'object' ? toppingId._id : toppingId;

                            if (!id) {
                                console.warn(`Invalid toppingId: ${toppingId}`);
                                return null;  // Skip if invalid
                            }

                            // Find the topping by ID
                            const topping = availableToppings.find((t) => t._id === id);
                            if (!topping) {
                                console.warn(`Topping with ID ${id} not found in availableToppings`);
                                return null;  // Skip if topping not found
                            }

                            return (
                                <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {topping.name}
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleToppingChange(
                                            pizzaToppings.filter((t) => t !== id)  // Remove topping
                                        )}
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
                                        onClick={() => handleToppingChange(
                                            [...pizzaToppings, topping._id] // Add topping
                                        )}
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

            {/* Save Button */}
            <div className="mt-3">
                <button className="btn btn-primary" onClick={handleSaveToppings}>
                    Save Toppings
                </button>
            </div>

            {/* Success or Error Message */}
            {successMessage && (
                <div className="mt-3 alert alert-info">
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default ToppingsEditor;
