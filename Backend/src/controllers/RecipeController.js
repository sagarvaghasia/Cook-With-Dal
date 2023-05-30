/* Author: Anuj Dawar, Sagarkumar Vaghasia,  */

const RecipeService = require("../services/RecipeService");

exports.getAllRecipes = async (req, res) => {
  const recipeService = new RecipeService();

  try {
    const Recipes = await recipeService.getAllRecipes();
    let RecipeList = [];
    for (let i = 0; i < Recipes.length; i++) {
      RecipeList.push(Recipes[i].transform());
    }
    res.json({ data: RecipeList, success: true });
  } catch (err) {
    res.status(500).json({ data: [], error: err.message, success: false });
  }
};

exports.getAllRecipesByEmail = async (req, res) => {
  const recipeService = new RecipeService();

  try {
    const recipes = await recipeService.getAllRecipesByEmail(req.query.emailId);
    let recipeList = [];
    recipes.forEach((recipe) => {
      recipeList.push(recipe.transform());
    });
    res.json({ data: recipeList, success: true });
  } catch (err) {
    res.status(500).json({ data: [], error: err.message, success: false });
  }
};

exports.getRecipeById = async (req, res) => {
  const recipeService = new RecipeService();

  try {
    const recipe = await recipeService.getRecipeById(
      req.params.id,
      req.params.userId
    );
    res.json({ data: recipe, success: true });
  } catch (err) {
    res.status(500).json({ data: [], error: err.message, success: false });
  }
};

exports.getRecipeByRecipeId = async (req, res) => {
  const recipeService = new RecipeService();
  try {
    const recipe = await recipeService.getRecipeByRecipeId(req.params.recipeId);
    res.json({ data: recipe.transform(), success: true });
  } catch (err) {
    res.status(500).json({ data: [], error: err.message, success: false });
  }
};

exports.createRecipe = async (req, res) => {
  const recipeService = new RecipeService();

  try {
    const recipe = await recipeService.createRecipe({
      ...req.body,
      image: req.file.path,
    });
    res.json({
      data: recipe.transform(),
      status: "success",
      statusMessage: "Recipe Created",
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

exports.likeRecipe = async (req, res) => {
  const recipeService = new RecipeService();

  try {
    const recipe = await recipeService.likeRecipe(
      req.params.id,
      req.body,
      req.params.userId
    );

    res.json({
      data: recipe.transform(),
      status: "success",
      statusMessage: "Recipe Updated",
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

exports.unlikeRecipe = async (req, res) => {
  const recipeService = new RecipeService();

  try {
    const recipe = await recipeService.unlikeRecipe(
      req.params.id,
      req.body,
      req.params.userId
    );
    res.json({
      data: recipe.transform(),
      status: "success",
      statusMessage: "Recipe Updated",
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

exports.addComment = async (req, res) => {
  const recipeService = new RecipeService();

  try {
    const recipe = await recipeService.addComment(
      req.params.recipeId,
      req.body
    );
    res.json({
      data: recipe.transform(),
      success: true,
      statusMessage: "Comment Added",
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

exports.deleteCommentById = async (req, res) => {
  const recipeService = new RecipeService();

  try {
    const recipe = await recipeService.deleteComment(
      req.params.recipeId,
      req.params.commentId
    );
    res.json({
      data: recipe.transform(),
      success: true,
      statusMessage: "Comment Deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

exports.updateCommentById = async (req, res) => {
  const recipeService = new RecipeService();

  try {
    const recipe = await recipeService.updateComment(
      req.params.recipeId,
      req.params.commentId,
      req.body
    );
    res.json({
      data: recipe.transform(),
      success: true,
      statusMessage: "Comment Updated",
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

exports.addRecipe = async (req, res) => {
  console.log("req.body inside add recipe controller");
  const recipeData = req.body;
  console.log(req.body);
  const recipeService = new RecipeService();

  try {
    // let imagePath = req.file.path;
    const recipe = await recipeService.createRecipe(recipeData);
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const recipeData = req.body;
  // recipeData["image"] = req.file.path;
  const recipeService = new RecipeService();

  try {
    const updatedRecipe = await recipeService.updateRecipe(
      recipeId,
      recipeData
    );
    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//delete recipe by id
exports.deleteRecipeById = async (req, res) => {
  console.log("inside controller delete recipe");
  const recipeService = new RecipeService();

  try {
    console.log("===============", req.params.recipeId, req.params.userId);
    const recipe = await recipeService.deletedRecipe(
      req.params.recipeId,
      // req.params.commentId
      req.params.userId
    );
    console.log("RECIPE>>>>>>>", recipe);
    res.json({
      data: recipe.transform(),
      success: true,
      statusMessage: "Comment Deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};
