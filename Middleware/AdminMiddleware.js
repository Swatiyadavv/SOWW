const Admin = require("../Model/AdminModel");

const authMiddleware = async (req, res, next) => {
    const { authKey } = req.headers;

    if (!authKey) {
        return res.status(403).json({ message: "No auth key provided" });
    }

    const admin = await Admin.findOne({ authKey });

    if (!admin) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    next();
};

module.exports = authMiddleware;


