/* Author : Parul Raich */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  recipeId: {
    type: String,
    required: true,
  },
});

bookmarkSchema.method("transform", function () {
  let dataObject = this.toObject();
  dataObject.bookmarkId = dataObject._id;
  Reflect.deleteProperty(dataObject, "_id");
  return dataObject;
});

module.exports = mongoose.model("bookmark", bookmarkSchema);
