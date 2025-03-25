const express = require("express");
const User = require("../Model/AdminCrud");
const adminMiddleware = require("../Middleware/AdminMiddleware");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const getUsersByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const users = await User.find({ status });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const toggleBlockUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        user.status = user.status === "blocked" ? "active" : "blocked";
        await user.save();
        res.status(200).json({ message: `User ${user.status === "blocked" ? "blocked" : "unblocked"}` });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = {
    getAllUsers: [  getAllUsers],
    getUsersByStatus: [  getUsersByStatus],
    getUserById: [  getUserById],
    updateUser: [  updateUser],
    toggleBlockUser: [  toggleBlockUser],
    deleteUser: [  deleteUser]
};



// postman api

