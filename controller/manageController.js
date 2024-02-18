const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const Manager = require("../models/manager");

exports.userAuthentication = async (req, res, next) => {};

// @desc register new users
// @route /api/users
// @access public
const registerUser = async (req, res) => {
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
    createAt,
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
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    res.status(400).json({ message: "Please include all fields" });
  }

  // Find if user already exists
  const userExists = await Manager.findOne({ email });

  if (!userExists) {
    res.status(400).json({ message: "User not found!" });
  }

  // Check user and passwords match
  if (userExists && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
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
  registerUser,
  loginUser,
  getMe,
};
