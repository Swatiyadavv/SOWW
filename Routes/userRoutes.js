const express = require("express");

const {
  addUser,
  getUser,
  updateUserName,
  login,
  forgotPassword,
  resetPassword,
  verifyOtp,
  addIntersts,
  verifySignupOtp
} = require("../Controller/userController");

const router = express.Router();
router.route("/add").post(addUser);
router.route("/get").get(getUser);
router.route("/update").patch(updateUserName);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/verifyotp/:email").post(verifyOtp);
router.route("/resetpassword/:email").patch(resetPassword);
router.route("/addinterest/:id").patch(addIntersts);
router.route("/verifySignupOtp/:email").post(verifySignupOtp);

module.exports = router;
