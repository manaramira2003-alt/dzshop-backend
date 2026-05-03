const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");
const auth = require("../middleware/authMiddleware");

// 📦 Get all products
router.get("/", productController.getAllProducts);

// 📦 Get product by id
router.get("/:id", productController.getProductById);

// 🔒 Create product (PROTECTED)
router.post("/", auth, productController.createProduct);

// 🌱 Seed products (NO AUTH)
router.post("/seed", productController.seedProducts);

// 🛒 Orders
router.post("/", auth, orderController.createOrder);


module.exports = router;