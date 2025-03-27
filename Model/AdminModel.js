const mongoose = require("mongoose");  
const crypto = require("crypto");  

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    authKey: { type: String, required: true, default: "admin" }
});

// ✅ Password Encrypt Function
AdminSchema.methods.encryptPassword = function (password) {
    return crypto.createHash("sha256").update(password).digest("hex");
};

// ✅ Password Compare Function
AdminSchema.methods.comparePassword = function (enteredPassword) {
    const hashedEnteredPassword = crypto.createHash("sha256").update(enteredPassword).digest("hex");
    return hashedEnteredPassword === this.password;
};

module.exports = mongoose.model("admins", AdminSchema);