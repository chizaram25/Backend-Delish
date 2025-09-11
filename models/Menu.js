const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
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
      enum: [
        "Breakfast",
        "Lunch",
        "Dinner",
        "appetizers",
        "main-course",
        "desserts",
        "beverages",
      ],
    },
    type: {
      type: String,
      enum: [
        "vegetarian",
        "vegan",
        "gluten-free",
        "seafood",
        "meat",
        "dairy-free",
      ],
    },
    ingredients: [
      {
        type: String,
      },
    ],
    allergens: [
      {
        type: String,
      },
    ],
    availability: {
      type: Boolean,
      default: true,
    },
    preparationTime: {
      type: Number,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Menu", menuSchema);
