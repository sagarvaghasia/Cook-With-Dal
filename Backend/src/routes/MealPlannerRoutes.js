/* Author: Anuj Dawar */

const express = require("express");
const router = express.Router();

const { getAllMealPlans, addMealPlan, updateMealPlan, deleteMealPlan } = require("../controllers/MealPlannerController");

router.route("/:userId").get(getAllMealPlans);
router.route("/").post(addMealPlan);
router.route("/").put(updateMealPlan);
router.route("/:mealPlanId").delete(deleteMealPlan);

module.exports = router;
