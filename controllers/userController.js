const User = require("../models/User");

// ✅ Create User
exports.createUser = async (req, res) => {
  try {
    const user = await User.create({
      name: "Amira",
      email: "amiramanar2003@gmail.com",
      password: "123456"
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// (اختياري) Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};