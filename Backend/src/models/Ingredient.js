//Author - Ruchika.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let IngredientSchema = new Schema({
  ingredientId: String,
  ingredient: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

IngredientSchema.method("transform", function () {
  let dataObject  = this.toObject();
  dataObject.ingredientId = dataObject._id;
  Reflect.deleteProperty(dataObject, "_id");
  return dataObject;
});

module.exports = mongoose.model("Ingredient", IngredientSchema);
