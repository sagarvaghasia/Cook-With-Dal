/* Author: Anuj Dawar, Sagarkumar Vaghasia */

const Recipe = require("../models/Recipe");
const Bookmark = require("../models/Bookmark");
const MealPlan = require("../models/MealPlan");
const RecipeLikedByUserModel = require("../models/RecipesLikedByUsers");
const notification = require("../models/Notification");
class RecipeService {
  constructor() {}

  async createRecipe(recipeData) {
    console.log("inside create recipe service");

    const {
      name,
      emailId,
      description,
      ingredients,
      instructions,
      servings,
      prepTime,
      image,
    } = recipeData;

    const newRecipe = new Recipe({
      name,
      emailId,
      image,
      description,
      ingredients,
      instructions,
      servings,
      prepTime,
      createdAt: new Date(),
    });
    const savedRecipe = await newRecipe.save();
    return savedRecipe;
  }

  async getRecipeByRecipeId(recipeId) {
    console.log("inside service");
    const recipe = await Recipe.findById(recipeId);
    return recipe;
  }

  async getAllRecipes() {
    const recipes = await Recipe.find();
    return recipes;
  }

  async getAllRecipesByEmail(emailId) {
    return await Recipe.find({ emailId: emailId });
  }

  async getAllRecipes() {
    const recipes = await Recipe.find();
    return recipes;
  }

  async getAllRecipesByEmail(emailId) {
    return await Recipe.find({ emailId: emailId });
  }

  async updateRecipe(recipeId, recipeData) {
    const {
      name,
      emailId,
      image,
      description,
      ingredients,
      instructions,
      servings,
      prepTime,
    } = recipeData;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        name,
        image,
        emailId,
        description,
        ingredients,
        instructions,
        servings,
        prepTime,
        updatedAt: new Date(),
      },
      { new: true }
    );
    return updatedRecipe;
  }

  deletedRecipe = async (recipeId, userId) => {
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
    const response1 = await Bookmark.deleteMany({
      recipeId: recipeId,
      userId: userId,
    });
    const response2 = await MealPlan.deleteMany({
      recipeId: recipeId,
      userId: userId,
    });

    return deletedRecipe;
  };

  getRecipeById = async (id, userId) => {
    const recipe = await Recipe.findById(id);

    const likedRecipe = await RecipeLikedByUserModel.where("recipeId")
      .equals(id)
      .where("userId")
      .equals(userId);

    if (likedRecipe.length > 0) {
      const tempObject = recipe.toJSON();
      tempObject["liked"] = true;
      tempObject["recipe_id"] = id;
      return tempObject;
    } else {
      const tempObject = recipe.toJSON();
      tempObject["liked"] = false;
      tempObject["recipe_id"] = id;
      return tempObject;
    }
  };

  likeRecipe = async (recipeId, recipe, userId) => {
    const recipeObject = await Recipe.findByIdAndUpdate(recipeId, recipe, {
      new: true,
    });
    const recipeData = recipeObject.toJSON();
    const recipeLikedByUserObject = {
      recipeId: recipeId,
      userId: userId,
    };

    notification.create({
      userId: recipeData.emailId,
      notificationType: "LIKE",
      notificatonMessage: "You got a new like on " + recipeData.name,
    });

    await RecipeLikedByUserModel.create(recipeLikedByUserObject);

    return recipeObject;
  };

  unlikeRecipe = async (recipeId, recipe, userId) => {
    const recipeObject = await Recipe.findByIdAndUpdate(recipeId, recipe);

    const recipeUnlikedByUserObject = {
      recipeId: recipeId,
      userId: userId,
    };

    await RecipeLikedByUserModel.findOneAndDelete(recipeUnlikedByUserObject);

    return recipeObject;
  };

  addComment = async (recipeId, comment) => {
    const recipe = await Recipe.findById(recipeId);
    recipe.comments.push(comment);
    recipe.save();

    notification.create({
      userId: recipe.emailId,
      notificationType: "COMMENT",
      notificatonMessage: "You got a new comment on " + recipe.name,
    });

    return recipe;
  };

  deleteComment = async (recipeId, commentId) => {
    const recipe = await Recipe.findById(recipeId);

    const filtered = recipe.comments.filter((c) => {
      return c.id != commentId;
    });

    recipe.comments = filtered;
    recipe.save();

    return recipe;
  };

  updateComment = async (recipeId, commentId, comment) => {
    let recipe = await Recipe.findById(recipeId);

    let updatedComments = recipe.comments.forEach((c) => {
      if (c.id == commentId) c.comment = comment.comment;
    });

    console.log("recipe", recipe);
    console.log("updatedComments", updatedComments);

    recipe.save();

    return recipe;
  };
}

module.exports = RecipeService;
