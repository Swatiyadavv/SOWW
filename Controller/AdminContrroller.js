const Admin = require("../Model/AdminModel");

// 1️⃣ **Admin Create (Sirf Ek Baar Chalega)**
const createAdmin = async (req, res) => {
    try {
        const adminExists = await Admin.findOne({ email: "admin@example.com" });

        if (adminExists) {
            return res.status(400).json({ message: "Admin already exists!" });
        }

        const admin = new Admin({
            email: "admin@example.com",
            password: new Admin().encryptPassword("admin123"),
            authKey: "admin"  // Always "admin"
        });

        await admin.save();
        res.status(201).json({ message: "Admin created successfully!", admin });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// 2️⃣ **Admin Login**
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email !== "admin@example.com") {
            return res.status(403).json({ message: "Only admin can login!" });
        }

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        if (!admin.comparePassword(password)) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        res.status(200).json({
            message: "Login successful!",
            authKey: admin.authKey
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// 3️⃣ **Get Admin Profile**
const getAdminProfile = async (req, res) => {
    try {
        const { authKey } = req.body;

        if (!authKey || authKey !== "admin") {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const admin = await Admin.findOne({ email: "admin@example.com" }).select("-password -salt");

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({ admin });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { createAdmin, adminLogin, getAdminProfile };
