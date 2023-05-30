/* Author: Anuj Dawar, Sagar */

const MealPlan = require("../models/MealPlan");

exports.addMealPlan = async (userId, recipeId, mealDate) => {
  try {
    const data = await MealPlan.create({
      userId: userId,
      recipeId: recipeId,
      mealDate: mealDate,
    });

    return true;
  } catch (err) {
    return false;
  }
};

exports.deleteMealPlan = async (mealPlanId) => {
  try {
    const data = await MealPlan.findByIdAndDelete(mealPlanId);
    return true;
  } catch (err) {
    return false;
  }
};

exports.updateMealPlan = async (mealPlanId, recipeId, mealDate) => {
  try {
    await MealPlan.findByIdAndUpdate(mealPlanId, {
      recipeId: recipeId,
      mealDate: mealDate,
    });

    return true;
  } catch (err) {
    return false;
  }
};

exports.getAllMealPlans = async (userId) => {
  const mealPlans = await MealPlan.find().where("userId").equals(userId);
  return mealPlans;
};
