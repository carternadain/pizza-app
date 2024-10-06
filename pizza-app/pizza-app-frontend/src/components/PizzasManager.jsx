import React, { useState, useEffect } from 'react';
import { getPizzas, addPizza, deletePizza, updatePizza } from '../services/pizzaService';
import { getToppings } from '../services/toppingService';

function PizzasManager() {
  const [pizzas, setPizzas] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [newPizza, setNewPizza] = useState({ name: '', toppings: [] });

  useEffect(() => {
    loadPizzas();
    loadToppings();
  }, []);

  const loadPizzas = async () => {
    const data = await getPizzas();
    setPizzas(data);
  };

  const loadToppings = async () => {
    const data = await getToppings();
    setToppings(data);
  };

  const handleAddPizza = async () => {
    if (!newPizza.name) return;
    await addPizza(newPizza);
    setNewPizza({ name: '', toppings: [] });
    loadPizzas();
  };

  const handleDeletePizza = async (id) => {
    await deletePizza(id);
    loadPizzas();
  };

  const handleUpdatePizza = async (pizza) => {
    await updatePizza(pizza._id, pizza);
    loadPizzas();
  };

  return (
    <div>
      <h2>Manage Pizzas</h2>
      <ul>
        {pizzas.map(pizza => (
          <li key={pizza._id}>
            {pizza.name} ({pizza.toppings.join(', ')})
            <button onClick={() => handleDeletePizza(pizza._id)}>Delete</button>
            <button onClick={() => handleUpdatePizza(pizza)}>Update</button>
          </li>
        ))}
      </ul>
      <input 
        value={newPizza.name} 
        onChange={(e) => setNewPizza({ ...newPizza, name: e.target.value })} 
        placeholder="Pizza name" 
      />
      <div>
        <h3>Select Toppings:</h3>
        {toppings.map(topping => (
          <div key={topping._id}>
            <input 
              type="checkbox" 
              value={topping.name}
              onChange={(e) => {
                const checked = e.target.checked;
                const newToppings = checked
                  ? [...newPizza.toppings, e.target.value]
                  : newPizza.toppings.filter(t => t !== e.target.value);
                setNewPizza({ ...newPizza, toppings: newToppings });
              }} 
            />
            {topping.name}
          </div>
        ))}
      </div>
      <button onClick={handleAddPizza}>Add Pizza</button>
    </div>
  );
}

export default PizzasManager;
