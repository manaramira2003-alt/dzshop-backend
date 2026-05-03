const { Order, User, Product } = require("../models");

exports.createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const order = await Order.create({
  userId,
  totalPrice: 0
});

    let totalPrice = 0;

    for (const item of items) {
      const product = await Product.findByPk(item.productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ error: "Out of stock" });
      }

      // stock update (مهم للمشروع)
      product.stock = product.stock - item.quantity;
      await product.save();

      totalPrice += product.price * item.quantity;

      // junction table (OrderItems)
      await order.addProduct(product, {
        through: { quantity: item.quantity }
      });
    }

    order.totalPrice = totalPrice;
    await order.save();

    return res.status(201).json(order);

  } catch (error) {
  console.log("CHECKOUT ERROR:", error);
  return res.status(500).json({ error: error.message });
} 
};
