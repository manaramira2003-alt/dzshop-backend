const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0, // 👈 price ما يقدرش يكون سلبي
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 10,
  },
    image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Product;
