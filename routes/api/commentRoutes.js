const router = require("express").Router();
const {
  addComment,
  removeComment,
} = require("../../controllers/commentControllers");

router.route("/:pizzaId").post(addComment);
router.route("/:pizzaId/:commentId").delete(removeComment);

module.exports = router;
