const Reservation = require("../models/Reservation");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const generateConfirmationCode = () => {
  return crypto.randomBytes(5).toString("hex").toUpperCase();
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const sendConfirmationEmail = (email, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reservation Confirmation",
    text: `Your reservation has been confirmed. Your confirmation code is: ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
      console.log("Confirmation email sent to:", email);
    }
  });
};
const createReservation = async (req, res) => {
  try {
    const { name, email, date, time, guests, specialRequest } = req.body;
    const confirmationCode = generateConfirmationCode();

    const newReservation = new Reservation({
      name,
      email,
      date,
      time,
      numberOfGuests: guests,
      specialRequest,
      confirmationCode,
    });

    await newReservation.save();
    sendConfirmationEmail(email, confirmationCode);

    res
      .status(201)
      .json({ message: "Reservation created successfully", confirmationCode });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getReservationByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const foundReservation = await Reservation.findOne({
      confirmationCode: code,
    });
    if (!foundReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(foundReservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  createReservation,
  getReservations,
  getReservationByCode,
};
