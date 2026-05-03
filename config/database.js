const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  ssl: process.env.NODE_ENV === "production"
});

// test connection
sequelize.authenticate()
  .then(() => console.log("Database connected ✔"))
  .catch(err => console.log("DB error ❌", err));

module.exports = sequelize;
