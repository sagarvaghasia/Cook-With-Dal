/* Author: Anuj Dawar */

const NotificationService = require("../services/NotificationService");

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await NotificationService.getAllNotifications(
      req.params.userId
    );

    if (notifications) {
      res.status(200).json({ data: notifications, success: true });
    } else res.status(500).json({ data: [], success: false });
  } catch (err) {
    res.status(500).json({ data: [], error: err.message, success: false });
  }
};

exports.addNotification = async (req, res) => {
  try {
    const status = await NotificationService.addNotification(
      req.body.userId,
      req.body.notificationType,
      req.body.notificationMessage
    );

    if (status) res.status(200).json({ success: true });
    else res.status(500).json({ success: false });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const status = await NotificationService.deleteNotification(
      req.params.notificationId
    );

    if (status) res.status(200).json({ success: true });
    else res.status(500).json({ success: false });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};
