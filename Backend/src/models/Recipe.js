/* Author: Anuj Dawar, Sagarkumar Vaghasia */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  emailId: String,
  name: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      comment: String,
      createdBy: String,
      createdAt: { type: Date, default: Date.now },
      commentId: mongoose.SchemaTypes.ObjectId,
    },
  ],
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  prepTime: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

recipeSchema.method("transform", function () {
  let dataObject = this.toObject();
  dataObject.recipe_id = dataObject._id;
  Reflect.deleteProperty(dataObject, "_id");
  return dataObject;
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
