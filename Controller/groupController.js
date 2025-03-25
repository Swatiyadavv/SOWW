const Group = require("../Model/groupModel"); // Use uppercase 'G' for models by convention

const addGroup = async (req, res) => {
  const { userId, name, description, status, groupMember } = req.body;

  try {
    // Create a new group instance
    let newGroup = new Group({ userId, name, description, status, groupMember });

    // Save to database
    newGroup = await newGroup.save();

    res.status(201).json({ message: "Success!", data: newGroup });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Failed!", error: error.message });
  }
};


const getAllGroups = async (req, res) => {
    try {
        let getgroup = await Group.find({});
        console.log("hello");
        res.status(200).send({ message: "Success!", data: getgroup });
    } catch (error) {
        res.status(400).send({ message: "Failed!", data: "", error: error.message });
    }
};





const confirmUserInGroup = async (req, res) => {
    const { groupId, userId } = req.body;
  
    try {
      const group = await Group.findById(groupId);
  
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
  
      if (group.groupMember.includes(userId)) {
        return res.status(400).json({ message: "User is already a member" });
      }
  
      group.groupMember.push(userId);
      await group.save();
  
      res.status(200).json({ message: "User confirmed in group", data: group });
    } catch (error) {
      res.status(500).json({ message: "Error confirming user in group", error: error.message });
    }
  };
  

  

module.exports = { addGroup,confirmUserInGroup,getAllGroups };
