//Author - Ruchika.
const ShoppingListModel = require("../models/ShoppingList");

exports.getAllShoppingLists = async (emailId) => {
  return await ShoppingListModel.find({
    userId: emailId,
  });
};

exports.createShoppingList = async (shoppingList) => {
  return await ShoppingListModel.create(shoppingList);
};

exports.updateShoppingList = async (id, shoppingList) => {
  return await ShoppingListModel.findByIdAndUpdate(id, shoppingList);
};

exports.deleteShoppingList = async (id, shoppingList) => {
  return await ShoppingListModel.findByIdAndUpdate(id, shoppingList);
};
