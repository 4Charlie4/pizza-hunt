const router = require("express").Router();
const pizzaRoutes = require("./pizzaRoutes");

router.use("/pizzas", pizzaRoutes);

module.exports = router;
