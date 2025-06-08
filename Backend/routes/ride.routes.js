const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
    '/create',
    authMiddleware.authUser,
    body('pickup').isString().withMessage("Pickup location is required"),
    body('destination').isString().withMessage("Destination location is required"),
    body('vehicleType').isIn(['car', 'moto', 'auto']).withMessage("Vehicle type must be one of: car, moto, auto"),
    rideController.createRide
);

router.get(
    '/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().withMessage("Pickup location is required"),
    query('destination').isString().withMessage("Destination location is required"),
    rideController.getFare
)

router.post(
    '/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage("Ride ID is required"),
    rideController.confirmRide
)

router.get(
    '/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage("Ride ID is required"),
    query('otp').isString().withMessage("OTP is required"),
    rideController.startRide
)

router.post(
    '/end-ride',
    body('rideId').isMongoId().withMessage("Ride ID is required"),
    rideController.endRide
    )
module.exports = router;
