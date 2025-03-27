

const express = require("express");
const router = express.Router();
const adminController = require("../Controller/AdminContrroller");

// Route to create admin (Only runs once)
router.post("/create", adminController.createAdmin);

// Route for admin login
router.post("/login", adminController.adminLogin);

// Route to get admin profile
router.get("/profile", adminController.getAdminProfile);

module.exports = router;
