const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController  = require('../controllers/maps.controller');
const { query } = require('express-validator');

router.get(
  '/get-coordinates',
  query('address').notEmpty().withMessage('Address is required'),
  authMiddleware.authUser,
  mapController.getCoordinates
);

router.get('/get-distance-time',
    query('origin').notEmpty().withMessage('Origin is required'),
    query('destination').notEmpty().withMessage('Destination is required'),
    authMiddleware.authUser,
    mapController.getDistanceTime
)

// for suggesting address
router.get('/get-suggestions',
    query('address').notEmpty().withMessage('Address is required'),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
)
module.exports = router; 
