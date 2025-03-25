const mongoose = require("mongoose");
const { createHmac } = require("crypto");
const jwt = require("jsonwebtoken");
const S_key = "vaish";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    isDelete: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    interests: [{ type: String,required:true }],
    otp: {
      type: Number,
    },
    auth:{
      type:String,
      default:"user"
    },
    isVerified: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  let data = this;
  const salt = "password";
  const hashPassword = createHmac("sha256", salt)
    .update(data.password)
    .digest("hex");
  data.password = hashPassword;
  next();
});

userSchema.static("matchPassword", async function (email, password) {
  console.log("in");
  let user = await this.findOne({ email: email });

  if (!user) {
    console.log("email");

    throw new Error("user not found");
  }
  const salt = "password";
  const hashPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  if (user.password !== hashPassword) {
    console.log("pass");
    throw new Error("wrong password");
  } else {
    console.log("work");

    const token = jwt.sign({ userid: user._id, name: user.name }, S_key, {
      expiresIn: "1h",
    });
    return token;
  }
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
