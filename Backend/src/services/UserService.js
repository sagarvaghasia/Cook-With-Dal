/* Author : Faiza Umatiya, Saifali Prasla */
const UserModel = require("../models/User");
const RecipeModel = require("../models/Recipe");
const LikesCommentsModel = require("../models/RecipesLikedByUsers");
const BookmarkModel = require("../models/Bookmark");
const shoppingListModel = require("../models/ShoppingList");
const MealPlanModel = require("../models/MealPlan");

exports.createUser = async (user) => {
  return await UserModel.create(user);
};
exports.findUser = async (email) => {
  return await UserModel.findOne(email);
};
exports.updatePassword = async (email, password) => {
  return await UserModel.findOneAndUpdate(
    { email: email },
    { $set: { password: password } },
    { returnOriginal: false }
  );
};
exports.updateUserByEmail = async (email, updates) => {
  const user = await UserModel.findOneAndUpdate({ email: email }, updates, {
    returnOriginal: false,
  });
  return user;
};

exports.deleteUserByEmail = async (email) => {
  email = email.email;
  const response = await UserModel.findOneAndDelete({ email: email });

  await BookmarkModel.deleteMany({ userId: email });

  await MealPlanModel.deleteMany({ userId: email });

  await RecipeModel.deleteMany({ emailId: email });

  await LikesCommentsModel.deleteMany({
    userId: email,
  });

  await shoppingListModel.deleteMany({
    userId: email,
  });

  return response;
};
