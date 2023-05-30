/* Author: Anuj Dawar */

const express = require("express");

const {
  isRecipeLikedByUser,
} = require("../controllers/RecipeLikedByUserController");

const router = express.Router();

router.route("/:recipeId/:userId").get(isRecipeLikedByUser);

module.exports = router;
