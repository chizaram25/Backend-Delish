const Cart = require("../models/Cart");
const Menu = require("../models/Menu");

exports.addToCart = async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!menuItemId || !quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // Check if the menu item exists
    const menuItem = await Menu.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Find or create the cart for the user
    let userCart = await Cart.findOne({ user: userId });
    if (!userCart) {
      userCart = new Cart({ user: userId, items: [], totalAmount: 0 });
    }

    // Check if the item is already in the cart
    const existingItemIndex = userCart.items.findIndex(
      (item) => item.menuItem.toString() === menuItemId
    );

    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      userCart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      userCart.items.push({ menuItem: menuItemId, quantity });
    }

    // Calculate total amount
    let totalAmount = 0;
    for (const item of userCart.items) {
      const itemMenu = await Menu.findById(item.menuItem);
      if (itemMenu) {
        totalAmount += itemMenu.price * item.quantity;
      }
    }
    userCart.totalAmount = totalAmount;

    // Save the cart
    await userCart.save();

    res.status(200).json({ message: "Item added to cart", cart: userCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the cart for the user
    const userCart = await Cart.findOne({ user: userId }).populate(
      "items.menuItem"
    );

    if (!userCart) {
      // Return empty cart instead of 404
      return res.status(200).json({
        cart: {
          user: userId,
          items: [],
          totalAmount: 0,
        },
      });
    }

    res.status(200).json({ cart: userCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.removeFromCart = async (req, res) => {
  try {
    const { menuItemId } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!menuItemId) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // Find the cart for the user
    const userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart
    const itemIndex = userCart.items.findIndex(
      (item) => item.menuItem.toString() === menuItemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Remove the item from the cart
    userCart.items.splice(itemIndex, 1);

    // Save the updated cart
    await userCart.save();

    res.status(200).json({ message: "Item removed from cart", cart: userCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the cart for the user
    const userCart = await Cart.findOne({ user: userId });
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // Clear the cart items
    userCart.items = [];
    // Save the updated cart
    await userCart.save();
    res.status(200).json({ message: "Cart cleared", cart: userCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
