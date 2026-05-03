const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");
const auth = require("../middleware/authMiddleware");
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", auth, productController.createProduct);
router.post("/seed", productController.seedProducts);



module.exports = router;