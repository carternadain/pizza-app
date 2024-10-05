import React from 'react';
import ToppingsManager from './components/ToppingsManager';
import PizzasManager from './components/PizzasManager';

function App() {
  return (
    <div className="App">
      <h1>Pizza Manager</h1>
      <ToppingsManager />
      <PizzasManager />
    </div>
  );
}

export default App;
