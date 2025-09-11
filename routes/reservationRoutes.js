const express = require('express');
const router = express.Router();
const {createReservation, getReservations, getReservationByCode} = require('../controllers/reservationControllers');
const protect = require('../middleware/authMiddleware');


// general routes
router.post('/', createReservation);
router.get('/', getReservations);
router.get('/:code', getReservationByCode);

// protect routes
router.post('/', protect, createReservation);
router.get('/', protect, getReservations);
router.get('/:code', protect, getReservationByCode);

module.exports = router;