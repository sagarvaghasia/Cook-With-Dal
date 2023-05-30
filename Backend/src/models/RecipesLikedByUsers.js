/* Author: Anuj Dawar */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RecipeLikedByUserSchema = new Schema({
	recipeId: String,
	userId: String,
	createdAt: {
		type: Date,
		default: Date.now,
	}
});

RecipeLikedByUserSchema.method("transform", function () {
	let dataObject = this.toObject();
	dataObject.recipeLikedByUserId = dataObject._id;
	Reflect.deleteProperty(dataObject, "_id");
	return dataObject;
});

module.exports = mongoose.model("RecipeLikedByUser", RecipeLikedByUserSchema);
