const router = require("express").Router();
const {
  getAllPizza,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
} = require("../../controllers/pizzaControllers");

router.route("/").get(getAllPizza).post(createPizza);

//Check MVC project to compare this approach to the one from the MVC project.
router.route("/:id").get(getPizzaById).put(updatePizza).delete(deletePizza);

module.exports = router;
