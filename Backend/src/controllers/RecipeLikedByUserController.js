/* Author: Anuj Dawar */

const RecipeService = require("../services/RecipeLikedByUserService");

exports.isRecipeLikedByUser = async (req, res) => {
  try {
    const recipeLikedByUser = await RecipeService.isRecipeLikedByUser(
      req.params.recipeId,
      req.params.userId
    );

    if (recipeLikedByUser) {
      res.status(200).json({ data: true, success: true });
    } else {
      res.status(500).json({ data: false, success: false });
    }
  } catch (err) {
    res.status(500).json({ data: [], error: err.message, success: false });
  }
};
