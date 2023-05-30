/* Author : Parul Raich */
const express = require("express");

const {
  AddBookmarkRecipe,
  isRecipeBookmarked,
  RemoveBookmarkRecipe,
  getAllBookmarksRecipesByEmail,
} = require("../controllers/BookmarkController");

const router = express.Router();

router.route("/bookmark/:userId").put(AddBookmarkRecipe);
router
  .route("/bookmark/:recipeId/:userId")
  .get(isRecipeBookmarked)
  .delete(RemoveBookmarkRecipe);
router.route("/bookmark/:emailId").get(getAllBookmarksRecipesByEmail);
module.exports = router;
