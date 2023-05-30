/* Author : Faiza Umatiya, Saifali Prasla */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },

  photo: {
    type: String,
  },
  bio: {
    type: String,
  },
});

UserSchema.method("transform", function () {
  let dataObject = this.toObject();
  dataObject.ingredientId = dataObject._id;
  Reflect.deleteProperty(dataObject, "_id");
  return dataObject;
});

module.exports = mongoose.model("User", UserSchema);
