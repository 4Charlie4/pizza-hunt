const  {Pizza} = require("../models");

const pizzaController = {
  // Grabs all pizzas
  getAllPizza(req, res) {
    Pizza.find({})
      .then((pizzaData) => res.json(pizzaData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .then((pizzaData) => {
        if (!pizzaData) {
          res.status(404).json({ message: "No Pizza with this Id" });
          return;
        }
        res.json(pizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createPizza({ body }, res) {
    Pizza.create(body)
      .then((pizzaData) => res.json(pizzaData))
      .catch((err) => res.status(400).json(err));
  },

  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((pizzaData) => {
        if (!pizzaData) {
          res.status(404).json({ message: "No pizza with this id" });
          return;
        }
        res.json(pizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then((pizzaData) => {
        if (!pizzaData) {
          res.status(404).json({ message: "No pizza with this id" });
          return;
        }
        res.json(pizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = pizzaController;