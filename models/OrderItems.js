const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const OrderItems = sequelize.define("OrderItems", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = OrderItems;