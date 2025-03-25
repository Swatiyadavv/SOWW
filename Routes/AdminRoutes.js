const express = require("express");
const router = express.Router();
const adminController = require("../Controller/AdminContrroller");

router.post("/create", adminController.createAdmin);
router.post("/login", adminController.adminLogin);
router.get("/profile", adminController.getAdminProfile);

module.exports = router;
