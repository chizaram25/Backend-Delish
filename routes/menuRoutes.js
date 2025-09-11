const express = require('express');
const router = express.Router();
const { getMenuItems,getMenuItemById,getMenuByCategory,getMenuByType, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuControllers');
const protect = require('../middleware/authMiddleware');


router.get('/', getMenuItems);
router.get('/:id' , getMenuItemById);
router.get('/category/:catergory', getMenuByCategory);
router.get('/type/:type', getMenuByType);

// Protect all routes in this router and authenticated users only(except for the ones that are public)
router.post('/', protect, createMenuItem);
router.put('/:id', protect, updateMenuItem);
router.delete('/:id', protect, deleteMenuItem);

module.exports = router;
