const express = require ('express')

const {
   addGroup,
   confirmUserInGroup,
   getAllGroups

 }=require('../Controller/groupController');

const router = express.Router();

router.route("/").post(addGroup);
router.put("/confirm-user", confirmUserInGroup);
router.get("/", getAllGroups);



module.exports=router;