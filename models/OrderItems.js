const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const OrderItems = sequelize.define("OrderItems", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});

module.exports = OrderItems;