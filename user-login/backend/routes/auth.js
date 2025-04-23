const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// POST /api/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Send welcome email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your_email@gmail.com",
        pass: "your_app_password",
      },
    });

    await transporter.sendMail({
      from: "your_email@gmail.com",
      to: email,
      subject: "Welcome to Venue Management System!",
      text: `Hi ${name},\n\nWelcome to Venue Management System! We’re glad to have you.`,
    });

    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

  res.status(200).json({ message: "Login successful", user });
});

module.exports = router;
