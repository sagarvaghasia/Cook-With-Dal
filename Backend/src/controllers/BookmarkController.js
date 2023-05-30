/* Author : Parul Raich */

const BookmarkService = require("../services/BookmarkService");

exports.AddBookmarkRecipe = async (req, res) => {
  try {
    const bookmark = await BookmarkService.bookmarkRecipe(
      req.body.recipe_id,
      req.params.userId
    );

    res.json({
      data: bookmark.transform(),
      status: "success",
      statusMessage: "Bookmark Added",
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

exports.RemoveBookmarkRecipe = async (req, res) => {
  try {
    const bookmark = await BookmarkService.unBookmarkRecipe(
      req.params.recipeId,
      req.params.userId
    );

    res.json({
      status: "success",
      statusMessage: "Bookmark Removed",
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

exports.isRecipeBookmarked = async (req, res) => {
  try {
    const isbookmark = await BookmarkService.isBookmarked(
      req.params.recipeId,
      req.params.userId
    );

    if (isbookmark) {
      res.status(200).json({ data: true, success: true });
    } else {
      res.status(200).json({ data: false, success: true });
    }
  } catch (err) {
    res.status(500).json({ data: [], error: err.message, success: false });
  }
};

exports.getAllBookmarksRecipesByEmail = async (req, res) => {
  try {
    console.log("inside get all bookmarks");
    console.log(req.params.emailId);
    const recipes = await BookmarkService.getAllRecipesByEmail(
      req.params.emailId
    );
    let recipeList = [];
    recipes.forEach((recipe) => {
      recipeList.push(recipe.transform());
    });
    res.json({ data: recipeList, success: true });
  } catch (err) {
    res.status(500).json({ data: [], error: err.message, success: false });
  }
};
