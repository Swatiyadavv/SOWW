const Admin = require("../Model/AdminModel");

// 1️⃣ **Admin Create (Sirf Ek Baar Chalega)**
const createAdmin = async (req, res) => {
    try {
        const adminExists = await Admin.findOne({ username: "admin" });

        if (adminExists) {
            return res.status(400).json({ message: "Admin already exists!" });
        }

        const admin = new Admin({
            username: "admin",
            password: new Admin().encryptPassword("admin123"),
            authKey: "admin"  //  Always "admin"
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
        const { username, password } = req.body;

        if (username !== "admin") {
            return res.status(403).json({ message: "Only admin can login!" });
        }

        const admin = await Admin.findOne({ username });

        if (!admin) {
            console.log("❌ Admin not found in database!");
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        console.log("🟢 Entered Password Before Hashing:", password);
        console.log("🟢 Hashed Entered Password:", admin.encryptPassword(password));
        console.log("🟢 Stored Password in DB:", admin.password);

        if (!admin.comparePassword(password)) {  
            console.log("❌ Password does not match!");
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        console.log("✅ Login successful!");
        res.status(200).json({
            message: "Login successful!",
            authKey: admin.authKey
        });

    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

// 3️⃣ **Get Admin Profile**
const getAdminProfile = async (req, res) => {
    try {
        const { authKey } = req.body;  // ✅ Now reading from x-www-form-urlencoded body
        console.log("Received Auth Key:", authKey);

        if (!authKey || authKey !== "admin") {
            console.log("❌ Unauthorized: Invalid auth key!");
            return res.status(401).json({ message: "Unauthorized" });
        }

        const admin = await Admin.findOne({ username: "admin" }).select("-password -salt");
        console.log("Admin Found:", admin);

        if (!admin) {
            console.log("❌ Admin not found!");
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({ admin });
    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { createAdmin, adminLogin, getAdminProfile };




// POSTMAN URL
//  http://localhost:8080/admin/profile
//  http://localhost:8080/admin/create
//  http://localhost:8080/admin/login