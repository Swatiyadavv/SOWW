
const { createHmac } = require("crypto");
const UserModel = require("../Model/userModel");
const { otp, sentOtp } = require("../utils/helper");

const tempUsers = new Map();

const addUser = async (req, res) => {
  let { name, email, password, mobile, location, interests } = req.body;
  interests = interests.split(",");

  try {
    let user = await UserModel.find({
      $or: [
        { email: email, isVerified: true },
        { mobile: mobile, isVerified: true },
      ],
    });

    if (user.length === 0 && !tempUsers.has(email)) {
      let code = otp(6);
      console.log(code);

      tempUsers.set(email, {
        name,
        email,
        password,
        mobile,
        location,
        interests,
        otp: code,
      });

      sentOtp(email, code);

      res.status(201).send({ massage: "Success! OTP sent to your mail!" });
    } else {
      res
        .status(401)
        .send({ massage: "Email already exists", data: req.body });
    }
  } catch (error) {
    res.status(400).send({ massage: "Failed!", data: "", error: error });
  }
};

const verifySignupOtp = async (req, res) => {
  let { otp } = req.body;

  try {
    const email = req.params.email;
    const tempUser = tempUsers.get(email);

    if (!tempUser) {
      return res.status(404).send({ message: "OTP expired or invalid!" });
    }

    if (tempUser.otp == otp) {
      const user = new UserModel({
        ...tempUser,
        isVerified: true,
        otp: null,
      });

      const savedUser = await user.save();
      tempUsers.delete(email);

      res.status(200).send({ message: "OTP verified!", data: savedUser });
    } else {
      res.status(400).send({ message: "Incorrect OTP!" });
    }
  } catch (error) {
    res.status(400).send({ message: "Failed!", data: "", error: error });
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    let userdata = await UserModel.find({});
    res.status(200).send({ message: "Success!", data: userdata });
  } catch (error) {
    console.log("Error fetching users:", error);
    res.status(500).send({ message: "Request failed", data: "", error: error });
  }
};

const updateUserName = async (req, res) => {
  const { userId, newName } = req.body;
  try {
    let user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }
    user.name = newName;

    user = await user.save();

    res
      .status(200)
      .send({ message: "User name updated successfully!", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error updating user name", error: error });
  }
};

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({
      $and: [{ email: email }, { isVerified: true }, { isDelete: false }],
    });
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }
    let token = await UserModel.matchPassword(
      req.body.email,
      req.body.password
    );
    res
      .status(200)
      .send({ message: "login Success!", data: { token: token } });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Login Failed!", data: "", Error: "Login Failed" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send({ message: "Request Failed!", data: "" });
    } else {
      let code = otp(6);
      console.log(code);
      let data = await UserModel.updateOne(
        { email: user.email },
        { $set: { otp: code } }
      );
      sentOtp(user.email, code);
      res.status(200).send({ message: "OTP sent!", data: data });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Request Failed!", data: "", error: error });
  }
};

const verifyOtp = async (req, res) => {
  try {
    let userData = await UserModel.findOne({ email: req.params.email });
    if (userData.otp == req.body.otp) {
      res.status(200).send({ message: "OTP verified!", data: userData });
    } else {
      res.status(400).send({ message: "Incorrect OTP!", data: "" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "Request Failed!", data: "", error: error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const salt = "password";
    const hashPassword = createHmac("sha256", salt)
      .update(req.body.password)
      .digest("hex");

    let data = await UserModel.updateOne(
      {
        email: req.params.email,
      },
      { $set: { password: hashPassword } }
    );
    res.status(200).send({ message: "Password updated!", data: data });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: "Request Failed!", data: "", error: error });
  }
};

const addIntersts = async (req, res) => {
  try {
    const { id } = req.params;
    let { interests } = req.body;

    if (typeof interests === "string") {
      try {
        interests = JSON.parse(interests); // Convert JSON string to array
      } catch (error) {
        return res.status(400).json({ message: "Invalid interests format" });
      }
    }

    if (!Array.isArray(interests)) {
      return res.status(400).json({ message: "Interests should be an array" });
    }

    const user = await UserModel.findByIdAndUpdate(
      id,
      { $addToSet: { interests: { $each: interests } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Interests updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating interests", error });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    res.status(200).send({ message: "User fetched successfully!", data: user });
  } catch (error) {
    console.log("Error fetching user by ID:", error);
    res.status(500).send({ message: "Failed to fetch user", error });
  }
};

module.exports = {
  addUser,
  getUser,
  updateUserName,
  login,
  forgotPassword,
  verifyOtp,
  addIntersts,
  resetPassword,
  verifySignupOtp,
  getUserById
};
