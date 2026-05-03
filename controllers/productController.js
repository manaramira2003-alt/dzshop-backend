const Product = require('../models/Product');

// ✅ Seed Products (إدخال مجموعة منتجات)
exports.seedProducts = async (req, res) => {
  try {
  const products = [
      // MEN (5)
      { title: "T-shirt", price: 20, category: "men", stock: 10, image: "/images/tshirt.jpg" },
      { title: "Shirt", price: 35, category: "men", stock: 15, image: "/images/shirt.jpg" },
      { title: "Hoodie", price: 45, category: "men", stock: 20, image: "/images/hoodie.jpg" },
      { title: "Jeans", price: 55, category: "men", stock: 12, image: "/images/jeans.jpg" },
      { title: "Jacket", price: 80, category: "men", stock: 8, image: "/images/jacket.jpg" },

      // WOMEN (5)
      { title: "Dress", price: 50, category: "women", stock: 12, image: "/images/dress.jpg" },
      { title: "Blouse", price: 30, category: "women", stock: 18, image: "/images/blouse.jpg" },
      { title: "Skirt", price: 28, category: "women", stock: 14, image: "/images/skirt.jpg" },
      { title: "Bag", price: 60, category: "women", stock: 10, image: "/images/bag.jpg" },
      { title: "Heels", price: 75, category: "women", stock: 9, image: "/images/heels.jpg" },

      // SHOES (5)
      { title: "Nike Shoes", price: 70, category: "shoes", stock: 10, image: "/images/nike.jpg" },
      { title: "Adidas Shoes", price: 90, category: "shoes", stock: 8, image: "/images/adidas.jpg" },
      { title: "Puma Shoes", price: 65, category: "shoes", stock: 11, image: "/images/puma.jpg" },
      { title: "Converse", price: 50, category: "shoes", stock: 13, image: "/images/converse.jpg" },
      { title: "Boots", price: 85, category: "shoes", stock: 7, image: "/images/boots.jpg" },

      // COSMETICS (5)
      { title: "Lipstick", price: 15, category: "cosmetics", stock: 25, image: "/images/lipstick.jpg" },
      { title: "Foundation", price: 25, category: "cosmetics", stock: 20, image: "/images/foundation.jpg" },
      { title: "Face Cream", price: 18, category: "cosmetics", stock: 30, image: "/images/facecream.jpg" },
      { title: "Night Cream", price: 22, category: "cosmetics", stock: 15, image: "/images/nightcream.jpg" },
      { title: "Perfume", price: 40, category: "cosmetics", stock: 12, image: "/images/perfume.jpg" },
    ];

    const data = await Product.bulkCreate(products);
    res.status(201).json(data);

  } catch (error) {
    res.status(500).json({ error: "Seed failed" });
  }
};

// ✅ Create Product (إضافة منتج واحد)
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);

} catch (error) {
  console.log("CREATE ERROR:", error);
  res.status(500).json({ error: error.message });
}
};

// ✅ Get All Products (جلب كل المنتجات)
exports.getAllProducts = async (req, res) => {
  try {
    let { page = 1, limit = 10, category } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    const where = category ? { category } : {};

    const products = await Product.findAll({
      where,
      limit,
      offset,
      raw: true,
    });

    res.json(products);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};