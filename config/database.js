const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// test connection
sequelize.authenticate()
  .then(() => console.log("Database connected ✔"))
  .catch(err => console.log("DB error ❌", err));

module.exports = sequelize;
