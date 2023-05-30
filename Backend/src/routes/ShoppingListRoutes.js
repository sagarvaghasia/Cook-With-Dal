//Author - Ruchika.
const express = require("express");
const {
  getAllIngredientOptions,
} = require("../controllers/IngredientController");
const {
  getAllShoppingLists,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
} = require("../controllers/ShoppingListController");

const router = express.Router();

router.route("/options").get(getAllIngredientOptions);

router.route("/lists").get(getAllShoppingLists).post(createShoppingList);

router.route("/lists/:id").put(updateShoppingList).delete(deleteShoppingList);

module.exports = router;
