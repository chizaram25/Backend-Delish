const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    numberOfGuests: { type: Number, required: true },
    specialRequest: { type: String, default: '' },
    confirmationCode: { type: String, required: true },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Reservation', reservationSchema);

