//Author - Ruchika.
const shoppingListService = require("../services/ShoppingListService");

exports.getAllShoppingLists = async (req, res) => {
  try {
    const list = await shoppingListService.getAllShoppingLists(req.query.email);
    let shoppingList = [];
    for (let i = 0; i < list.length; i++) {
      shoppingList.push(list[i].transform());
    }
    res.json({ shoppingList: shoppingList, status: "success" });
  } catch (err) {
    res
      .status(500)
      .json({ shoppingList: [], error: err.message, status: "failure" });
  }
};

exports.createShoppingList = async (req, res) => {
  try {
    const list = await shoppingListService.createShoppingList(req.body);
    res.json({
      createdList: list.transform(),
      status: "success",
      statusMessage: "Shopping List Created",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateShoppingList = async (req, res) => {
  try {
    await shoppingListService.updateShoppingList(req.params.id, req.body);
    res.json({ status: "success", statusMessage: "Shopping List Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteShoppingList = async (req, res) => {
  try {
    await shoppingListService.deleteShoppingList(req.params.id, req.body);
    res.json({ status: "success", statusMessage: "Shopping List Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
