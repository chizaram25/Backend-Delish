const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
    description: {
    type: String,
    required: true,
  },
    price: {
    type: Number,
    required: true,
  },
    category: {
    type: String,
    required: true,
    enum: ['Breakfast', 'Lunch', 'Dinner'],
    },
    image: {
    type: String,
    required: true,
    },
    
    },
  {
    timestamps: true,
  }
);

    module.exports = mongoose.model('Menu', menuSchema);