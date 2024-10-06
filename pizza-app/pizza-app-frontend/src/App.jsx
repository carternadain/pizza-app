import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PizzaList from './components/PizzaList';
import ToppingsList from './components/ToppingsList';
import App from './App';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/pizzas" component={PizzaList} />
          <Route path="/toppings" component={ToppingsList} />
          <Route exact path="/" render={() => <h1>Welcome to Pizza App</h1>} />
          <Route path="*" render={() => <h1>404 - Page Not Found</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
