/* Author: Anuj Dawar */

const RecipeLikedByUser = require("../models/RecipesLikedByUsers");

exports.isRecipeLikedByUser = async (recipeId, userId) => {
  const data = await RecipeLikedByUser.where("recipeId")
    .equals(recipeId)
    .where("userId")
    .equals(userId);

  if (data) return true;

  return false;
};
