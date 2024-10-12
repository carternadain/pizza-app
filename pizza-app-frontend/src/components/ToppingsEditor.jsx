import React, { useState } from 'react';

const ToppingsEditor = ({ pizzaToppings = [], availableToppings = [], handleToppingChange, updatePizzaToppings }) => {
    const [successMessage, setSuccessMessage] = useState(''); // To handle success messages

    // Filter out invalid topping IDs
    const cleanedPizzaToppings = pizzaToppings.filter(Boolean);

    // Get toppings that can be added (not already on the pizza)
    const toppingsToAdd = availableToppings.filter(
        (topping) => !cleanedPizzaToppings.includes(topping._id)
    );

    const handleSaveToppings = async () => {
        try {
            const uniqueToppings = [...new Set(cleanedPizzaToppings)]; // Ensure unique toppings only
            console.log('Saving toppings:', uniqueToppings);  // <-- Log added here
            await updatePizzaToppings(uniqueToppings); // Pass cleaned and unique toppings
            setSuccessMessage('Toppings updated successfully!'); // Show success message
            setTimeout(() => {
                window.location.reload(); // Reload the page after a short delay
            }, 1500); // Give a little time to show the success message
        } catch (error) {
            console.error('Failed to update toppings:', error);
            setSuccessMessage('Failed to update toppings. Please try again.');
        }
    };

    console.log('pizzaToppings (from props):', cleanedPizzaToppings);  // <-- Log already added

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
                                console.log('Processing toppingId:', toppingId);  // <-- Log added here
                                if (!toppingId) {
                                    console.warn('Skipping invalid toppingId:', toppingId);
                                    return null; // Skip if invalid
                                }

                                const id = typeof toppingId === 'object' ? toppingId._id : toppingId;
                                const topping = availableToppings.find((t) => t._id === id);

                                if (!topping) {
                                    console.warn(`Topping with ID ${id} not found in availableToppings`);
                                    return null; // Skip if topping not found
                                }

                                return (
                                    <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {topping.name}
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleToppingChange(id)}
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
                                        onClick={() => {
                                            const newToppings = cleanedPizzaToppings.filter(Boolean); // Remove any undefined values
                                            newToppings.push(topping._id);
                                            console.log('Adding toppingId:', topping._id, 'New toppings:', newToppings);
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
