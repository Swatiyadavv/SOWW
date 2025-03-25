const mongoose = require("mongoose");

const dbUrl = "mongodb://127.0.0.1:27017/SOW";

const dbConnection = ()=>{
    try {
        mongoose.connect(dbUrl);
        console.log("database Connection  succeed");
        
    } catch (error) {
        console.log(error);
        
        
    }
}

module.exports = dbConnection;