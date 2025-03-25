const mongoose = require('mongoose');
const GroupSchema =  new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status: { type: String,
    default: "pending" },
    groupMember:[{}],
       
},{
    timestamps:true
})
const GroupModel = mongoose.model('group',GroupSchema);
module.exports = GroupModel;
