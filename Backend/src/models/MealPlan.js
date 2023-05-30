/* Author: Anuj Dawar */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MealPlanSchema = new Schema({
	mealPlanId: String,
	userId: String,
	recipeId: String,
	mealDate: Date,
	createdAt: {
		type: Date,
		default: Date.now,
	}
});

MealPlanSchema.method("transform", function () {
	let dataObject = this.toObject();
	dataObject.mealPlanId = dataObject._id;
	Reflect.deleteProperty(dataObject, "_id");
	return dataObject;
});

module.exports = mongoose.model("MealPlan", MealPlanSchema);
