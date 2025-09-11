const express = require('express');
const router = express.Router();
const { getCartItems, addToCart, removeFromCart, clearCart } = require('../controllers/cartControllers');
const protect = require('../middleware/authMiddleware');

router.get('/', protect, getCartItems);
router.post('/', protect, addToCart);
router.delete('/', protect, removeFromCart);
router.delete('/clear', protect, clearCart); 

module.exports = router;