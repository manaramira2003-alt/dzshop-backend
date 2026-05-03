const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const orderController = require("../controllers/orderController");

// Create order
router.post("/", auth, orderController.createOrder);

module.exports = router;