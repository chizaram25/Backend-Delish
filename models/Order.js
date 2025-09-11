const mongoose = require('mongoose');
const { create } = require('./user');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    },
    items: [
        {
        menuItem: {
            type: Schema.Types.ObjectId,
            ref: 'Menu',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
        default: 'Pending',
    }, 
    confirmationCode: {
        type: String,
        required: true,
    },

    },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Order', orderSchema);
