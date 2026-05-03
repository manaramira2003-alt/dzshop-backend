const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");
const app = express();
app.use("/images", express.static("public/images"));
const User = require("./models/User");
const PORT = process.env.PORT || 3000;
require("./models/Product");
require("./models/Order");
// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.get("/health", (req, res) => {
  res.status(200).json({ message: "DZ-Shop API is running!" });
});
const bcrypt = require("bcryptjs");

app.get("/create-user", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("123456", 10);

    const user = await User.create({
      name: "Amira",
      email: "amiramanar2003@gmail.com",
      password: hashedPassword, // ✔ الصحيح
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// DB + Server start
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected ✔");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Tables created ✔");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error:", err);
  });
