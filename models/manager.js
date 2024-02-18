const mongoose = require("mongoose");
const validator = require("validator");
const managerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name!"],
    maxLenght: [30, "The length of the name should be less than 30 characters"],
  },
  family: {
    type: String,
    required: [true, "Please Enter Family!"],
    maxLenght: [
      30,
      "The length of the family should be less than 30 characters",
    ],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "please enter valid email address"],
  },
  password: {
    type: String,
    required: [true, "please enter password! "],
    minLenght: [
      8,
      "The length of the password should be less than 30 characters",
    ],
  },
  phoneNumber: {
    type: String,
    required: [true, "please enter password! "],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Managers", managerSchema);
