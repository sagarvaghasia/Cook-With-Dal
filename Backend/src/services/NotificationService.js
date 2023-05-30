/* Author: Anuj Dawar, Sagar */

const Notification = require("../models/Notification");

exports.addNotification = async (
  userId,
  notificationType,
  notificationMessage
) => {
  try {
    const data = await Notification.create({
      userId: userId,
      notificationType: notificationType,
      notificationMessage: notificationMessage,
    });

    return true;
  } catch (err) {
    return false;
  }
};

exports.deleteNotification = async (notificationId) => {
  try {
    const data = await Notification.findByIdAndDelete(notificationId);
    return true;
  } catch (err) {
    return false;
  }
};

exports.getAllNotifications = async (userId) => {
  const notificatons = await Notification.find().where("userId").equals(userId);
  return notificatons;
};
