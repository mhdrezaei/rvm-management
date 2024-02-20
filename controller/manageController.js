const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Manager = require("../models/manager");

exports.userAuthentication = async (req, res, next) => {};

// @desc register new users
// @route /api/users
// @access public
const registerManage = async (req, res) => {
  const { name, family, isAdmin, phoneNumber, email, password } = req.body;

  // Validation
  if (!name || !family || !email || !phoneNumber || !password || !isAdmin) {
    res.status(400).json({ message: "Please include all fields" });
  }

  // Find if user already exists
  const userExists = await Manager.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await Manager.create({
    name,
    family,
    email,
    phoneNumber,
    isAdmin,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// @desc login a users
// @route /api/users/login
// @access public
const loginManage = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    console.log("not exist")
    res.status(400).json({ message: "Please include all fields" });
  }

  // Find if user already exists
  const userExists = await Manager.findOne({ email });

  if (!userExists) {
    res.status(400).json({ message: "User not found!" });
  }else if(userExists && (await bcrypt.compare(password, userExists.password))) {
    console.log("success")
    res.status(200).json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      token: generateToken(userExists._id),
    });
  } else {
    console.log("failed")
    res.status(401).json({ message: "Invalid credentials!" });
    // throw new Error("Invalid credentials");
  }
};

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user);
};

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerManage,
  loginManage,
  getMe,
};
