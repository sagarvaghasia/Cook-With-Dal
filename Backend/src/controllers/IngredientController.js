//Author - Ruchika.
const IngredientService = require("../services/IngredientService");

exports.getAllIngredientOptions = async (req, res) => {
  try {
    const Ingredient = await IngredientService.getAllIngredientOptions();
    let IngredientLists = [];
    for (let i = 0; i < Ingredient.length; i++) {
      IngredientLists.push(Ingredient[i].transform());
    }
    res.json({ options: IngredientLists, status: "success" });
  } catch (err) {
    res
      .status(500)
      .json({ options: [], error: err.message, status: "failure" });
  }
};
