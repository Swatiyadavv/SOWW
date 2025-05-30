const express = require ('express')

const {
  addEvent,
  getAllEvents,
  getEventById,filterEvents

 }=require('../Controller/eventController');

const router = express.Router();
const{upload}=require("../Middleware/userMiddleware");





router.route("/addEvent").post( upload.single("eventPic"),addEvent);
router.route("/getAllEvents").get(getAllEvents);
router.get("/:id", getEventById);
router.get('/filter/:type', filterEvents);



module.exports=router;