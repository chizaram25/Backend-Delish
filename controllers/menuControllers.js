const Menu = require('../models/Menu');
const cloudinary = require('../config/cloudinaryConfig');


const createMenuItem = async (req, res) => {
  try {
    const file = req.file.path;
    const result = await cloudinary.uploader.upload(file, { folder: 'menu' });

    const newItem = new Menu({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      type: req.body.type,
      description: req.body.description,
      image: result.secure_url,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMenuItems = async (req, res) => {
  try {
    const items = await Menu.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMenuByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const items = await Menu.find({ category });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMenuByType = async (req, res) => {
  try {
    const { type } = req.params;
    const items = await Menu.find({ type });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getMenuItemById = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updateMenuItem = async (req, res) => {
  try {
    const file = req.file ? req.file.path : null;
    let imageUrl;

    if (file) {
      const result = await cloudinary.uploader.upload(file, { folder: 'menu' });
      imageUrl = result.secure_url;
    }

    const updatedItem = await Menu.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        //update if a new image is provided
        image: imageUrl || undefined, 
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  createMenuItem,
  getMenuItems,
  getMenuByCategory,
  getMenuByType,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem
};


