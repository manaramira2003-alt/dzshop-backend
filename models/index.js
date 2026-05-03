const sequelize = require('../config/database');
const User = require('./User');
const Order = require('./Order');
const Product = require('./Product');
const OrderItems = require('./OrderItems'); 
User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsToMany(Product, {
through: OrderItems,
foreignKey: "orderId"
});

Product.belongsToMany(Order, {
through: OrderItems,
foreignKey: "productId"
});
module.exports = { sequelize, User, Order, Product,  OrderItems };