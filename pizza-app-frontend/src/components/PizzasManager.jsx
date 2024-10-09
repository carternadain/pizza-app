// import React, { useState, useEffect } from 'react';
// import { getPizzas, addPizza, deletePizza, updatePizza } from '../services/pizzaService';
// import { getToppings } from '../services/toppingService';

// function PizzasManager() {
//   const [pizzas, setPizzas] = useState([]);
//   const [toppings, setToppings] = useState([]);
//   const [newPizza, setNewPizza] = useState({ name: '', toppings: [] });
//   const [editPizza, setEditPizza] = useState({ id: '', name: '', toppings: [] });

//   useEffect(() => {
//     loadPizzas();
//     loadToppings();
//   }, []);

//   const loadPizzas = async () => {
//     const data = await getPizzas();
//     setPizzas(data);
//   };

//   const loadToppings = async () => {
//     const data = await getToppings();
//     setToppings(data);
//   };

//   const handleAddPizza = async () => {
//     if (!newPizza.name) return;
//     await addPizza(newPizza);
//     setNewPizza({ name: '', toppings: [] });
//     loadPizzas();
//   };

//   const handleDeletePizza = async (id) => {
//     await deletePizza(id);
//     loadPizzas();
//   };

//   const handleUpdatePizza = async () => {
//     if (!editPizza.name) return;
//     await updatePizza(editPizza.id, { name: editPizza.name, toppings: editPizza.toppings });
//     setEditPizza({ id: '', name: '', toppings: [] });
//     loadPizzas();
//   };

//   return (
//     <div>
//       <h2>Manage Pizzas</h2>

//       {/* Add new pizza */}
//       <input 
//         value={newPizza.name} 
//         onChange={(e) => setNewPizza({ ...newPizza, name: e.target.value })} 
//         placeholder="Pizza name" 
//       />
//       <div>
//         <h3>Select Toppings:</h3>
//         {toppings.map(topping => (
//           <div key={topping._id}>
//             <input 
//               type="checkbox" 
//               checked={newPizza.toppings.includes(topping.name)}
//               onChange={(e) => {
//                 const checked = e.target.checked;
//                 const newToppings = checked
//                   ? [...newPizza.toppings, topping.name]
//                   : newPizza.toppings.filter(t => t !== topping.name);
//                 setNewPizza({ ...newPizza, toppings: newToppings });
//               }} 
//             />
//             {topping.name}
//           </div>
//         ))}
//       </div>
//       <button onClick={handleAddPizza}>Add Pizza</button>

//       {/* List of pizzas */}
//       <ul>
//         {pizzas.map(pizza => (
//           <li key={pizza._id}>
//             {pizza.name} ({pizza.toppings.join(', ')})
//             <button onClick={() => handleDeletePizza(pizza._id)}>Delete</button>
//             <button onClick={() => setEditPizza({ id: pizza._id, name: pizza.name, toppings: pizza.toppings })}>Edit</button>
//           </li>
//         ))}
//       </ul>

//       {/* Update existing pizza */}
//       {editPizza.id && (
//         <div>
//           <h3>Update Pizza</h3>
//           <input 
//             type="text" 
//             value={editPizza.name} 
//             onChange={(e) => setEditPizza({ ...editPizza, name: e.target.value })} 
//           />
//           <div>
//             <h3>Select Toppings:</h3>
//             {toppings.map(topping => (
//               <div key={topping._id}>
//                 <input 
//                   type="checkbox" 
//                   checked={editPizza.toppings.includes(topping.name)}
//                   onChange={(e) => {
//                     const checked = e.target.checked;
//                     const newToppings = checked
//                       ? [...editPizza.toppings, topping.name]
//                       : editPizza.toppings.filter(t => t !== topping.name);
//                     setEditPizza({ ...editPizza, toppings: newToppings });
//                   }} 
//                 />
//                 {topping.name}
//               </div>
//             ))}
//           </div>
//           <button onClick={handleUpdatePizza}>Update Pizza</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PizzasManager;
