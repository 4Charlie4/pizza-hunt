const router = require("express").Router();
const pizzaRoutes = require("./pizzaRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/pizzas", pizzaRoutes);
router.use("/comments", commentRoutes)

module.exports = router;
