const express = require("express");
const { getAllUsers, getUsersByStatus, getUserById, updateUser, toggleBlockUser, deleteUser } = require("../Controller/AdminUserCrud");
const adminMiddleware = require("../Middleware/AdminMiddleware");

const router = express.Router();

router.get("/",   getAllUsers);
router.get("/status/:status",   getUsersByStatus);
router.get("/:id",   getUserById);
router.put("/:id",   updateUser);
router.patch("/:id/block",   toggleBlockUser);
router.delete("/:id",   deleteUser);

module.exports = router;
