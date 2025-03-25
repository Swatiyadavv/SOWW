const express = require ('express')

const {
  addEvent,
  getAllEvents

 }=require('../Controller/eventController');

const router = express.Router();
const{upload}=require("../Middleware/userMiddleware");





router.route("/addEvent").post( upload.single("eventPic"),addEvent);
router.route("/getAllEvents").get(getAllEvents);




module.exports=router;