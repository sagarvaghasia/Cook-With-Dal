//Author - Ruchika.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ShoppingListSchema = new Schema({
  name: String,
  userId: String,
  index: Number,
  isDeleted: Boolean,
  selectedIngredients: [
    {
      ingredient: String,
      ingredientId: String,
    },
  ],
  clearedIngredients: [
    {
      ingredient: String,
      ingredientId: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ShoppingListSchema.method("transform", function () {
  let dataObject = this.toObject();
  dataObject.id = dataObject._id;
  Reflect.deleteProperty(dataObject, "_id");
  Reflect.deleteProperty(dataObject, "__v");
  return dataObject;
});

module.exports = mongoose.model("ShoppingList", ShoppingListSchema);
