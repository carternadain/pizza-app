# Pizza App

The Pizza App is a web-based application for managing pizzas and toppings, built using React and Vite. It enables pizza store owners to maintain an inventory of available toppings and allows pizza chefs to create customized pizzas by selecting from those toppings. The app supports essential CRUD (Create, Read, Update, Delete) operations for both pizzas and toppings with validations to ensure data integrity.

## Features

### Manage Toppings

As a pizza store owner, you can:
- **View a list of available toppings:** See all toppings available for creating pizzas.
- **Add a new topping:** Add a new topping to the list of available toppings.
- **Delete an existing topping:** Remove unwanted toppings from the list.
- **Update an existing topping:** Edit the details of an existing topping.
- **Prevent duplicate toppings:** Ensure that duplicate toppings cannot be added.

### Manage Pizzas

As a pizza chef, you can:
- **View a list of existing pizzas and their toppings:** Display all pizzas along with their associated toppings.
- **Create a new pizza:** Add a new pizza and customize it by choosing from the list of available toppings.
- **Delete an existing pizza:** Remove a pizza from the list.
- **Update an existing pizza:** Edit the name and toppings of a pizza.
- **Update toppings on an existing pizza:** Modify the toppings of a pizza.
- **Prevent duplicate pizzas:** Ensure that no two pizzas with the same name are created.

## Technologies Used

- **Frontend:** React, Vite
- **Backend:** Express, MongoDB, and body-parser
- **Deployment:** Netlify (frontend), Heroku (backend)


## Live application 

https://cryptic-thicket-49174-8acbdfd07325.herokuapp.com/ 


## Automated Test Suite

This project includes an automated test suite covering key functionalities of the Pizza App, such as adding pizzas, deleting pizzas, and managing toppings.

### Running the Tests

To run the tests, use the following commands:

1. Install the necessary dependencies if you haven't already:

   ```bash
   npm install

2. To run the test 

npm test
This will run all unit tests and component tests for the Pizza App using Jest and React Testing Library.

3. Test Function

Future testing will include database testing , and more files.