const order = require('../models/Order');
const menu = require('../models/Menu');
const cart = require('../models/Cart');
const {generateConfirmationCode} = require('../config/confirmationCodeGenerator');

const createOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { items } = req.body;

        // Validate input
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Invalid order items' });
        }

        // Calculate total amount
        let totalAmount = 0;
        for (const item of items) {
            const menuItem = await menu.findById(item.menuItemId);
            if (!menuItem) {
                return res.status(404).json({ message: `Menu item with ID ${item.menuItemId} not found` });
            }
            totalAmount += menuItem.price * item.quantity;
        }

        // Create a new order
        const newOrder = new order({
            user: userId,
            items: items.map(item => ({
                menuItem: item.menuItemId,
                quantity: item.quantity,
            })),
            totalAmount,
            status: 'Pending',
            confirmationCode: generateConfirmationCode(),
        });

        // Save the order
        await newOrder.save();

        // Clear cart after placing the order
        await cart.findOneAndUpdate({ user: userId }, { $set: { items: [] } });

        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = {
    createOrder,
}


