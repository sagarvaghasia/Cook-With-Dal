/* Author: Anuj Dawar */

const express = require("express");
const router = express.Router();

const { getAllNotifications, addNotification, deleteNotification } = require("../controllers/NotificationController");

router.route("/:userId").get(getAllNotifications);
router.route("/").post(addNotification);
router.route("/:notificationId").delete(deleteNotification);

module.exports = router;
