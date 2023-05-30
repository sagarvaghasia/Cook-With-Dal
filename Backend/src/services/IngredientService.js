//Author - Ruchika.
const IngredientModel = require("../models/Ingredient");

exports.getAllIngredientOptions = async () => {
  return await IngredientModel.find();
};
