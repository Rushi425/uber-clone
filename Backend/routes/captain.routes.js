const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller'); 
const { authCaptain } = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({ min: 3 }).withMessage("First name should be at least 3 characters"), 
    body('password').isLength({ min: 6 }).withMessage("Password should be at least 6 characters"),
    body('vehicle.color').isLength({ min: 3 }).withMessage("Vehicle color should be at least 3 characters"), 
    body('vehicle.plate').isLength({ min: 3 }).withMessage("Vehicle plate should be at least 3 characters"), 
    body('vehicle.capacity').isInt({ min: 1 }).withMessage("Capacity should be at least 1"), 
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage("Invalid Vehicle Type"), 
], captainController.registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 6 }).withMessage("Password should be at least 6 characters"),
], captainController.logincaptain);

router.get('/profile', authCaptain, captainController.getCaptainProfile);

router.get('/logout', authCaptain, captainController.logoutCaptain);

module.exports = router;
