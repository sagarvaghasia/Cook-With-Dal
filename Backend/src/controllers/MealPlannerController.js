/* Author: Anuj Dawar */

const MealPlannerService = require("../services/MealPlannerService");

exports.getAllMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlannerService.getAllMealPlans(
      req.params.userId
    );

    if (mealPlans) {
      res.status(200).json({ data: mealPlans, success: true });
    } else res.status(500).json({ data: [], success: false });
  } catch (err) {
    res.status(500).json({ data: [], error: err.message, success: false });
  }
};

exports.addMealPlan = async (req, res) => {
  try {
    const status = await MealPlannerService.addMealPlan(
      req.body.userId,
      req.body.recipeId,
      req.body.mealDate
    );

    if (status) res.status(200).json({ success: true });
    else res.status(500).json({ success: false });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

exports.updateMealPlan = async (req, res) => {
  try {
    const status = await MealPlannerService.updateMealPlan(
      req.body.mealPlanId,
      req.body.recipeId,
      req.body.mealDate
    );

    if (status) res.status(200).json({ success: true });
    else res.status(500).json({ success: false });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

exports.deleteMealPlan = async (req, res) => {
  try {
    const status = await MealPlannerService.deleteMealPlan(
      req.params.mealPlanId
    );

    if (status) res.status(200).json({ success: true });
    else res.status(500).json({ success: false });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};
