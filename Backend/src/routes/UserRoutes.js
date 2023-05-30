/* Author : Faiza Umatiya, Saifali Prasla */
const express = require("express");
const {
  addUser,
  authenticateUser,
  verifyEmail,
  updateUser,
  getUserByEmail,
  verifyAnswer,
  updatePassword,
  deleteUser,
} = require("../controllers/UserController");

const router = express.Router();

router.route("/addUser").post(addUser);
router.route("/authenticateUser").post(authenticateUser);
router.route("/verifyEmail").post(verifyEmail);
router.route("/getUser/:email").get(getUserByEmail);
router.route("/updateUser/:email").put(updateUser);
router.route("/updatePassword").put(updatePassword);
router.route("/verifyAnswer").post(verifyAnswer);

//delete user profile
router.route("/deleteUser/:email").delete(deleteUser);

module.exports = router;
