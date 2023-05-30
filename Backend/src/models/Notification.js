/* Author: Anuj Dawar */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let NotificationSchema = new Schema({
	notificationId: String,
	userId: String,
	notificationType: String,
	notificatonMessage: String,
	createdAt: {
		type: Date,
		default: Date.now,
	}
});

NotificationSchema.method("transform", function () {
	let dataObject = this.toObject();
	dataObject.mealPlanId = dataObject._id;
	Reflect.deleteProperty(dataObject, "_id");
	return dataObject;
});

module.exports = mongoose.model("Notification", NotificationSchema);
