const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
// ✅ Create user (ديناميك من Postman)
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body); // ✔ مهم

    res.status(201).json(user);

  } catch (err) {
    res.status(400).json({ error: err.message }); // ✔ validation error
  }
});

// ✅ Seed users
router.post("/seed-users", async (req, res) => {
  try {
    const users = [
      {
        name: "admin",
        email: "admin@test.com",
        password: "123456"
      },
      {
        name: "user",
        email: "user@test.com",
        password: "123456"
      }
    ];

    const data = await User.bulkCreate(users);

    res.status(201).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email, password }
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id },
      "secret_key",
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;