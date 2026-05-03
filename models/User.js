const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
    isEmail: true   // ✔ هذا هو المهم
  }
},
 password: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
    len: [6, 100]   // ✔ لازم على الأقل 6 حروف
  }
}
});

module.exports = User;
