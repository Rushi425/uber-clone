const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
module.exports.createRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { userId, pickup, destination, vehicleType } = req.body;
        
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });
        
        return res.status(201).json({ ride });
    } catch (error) {
        console.error('Error creating ride:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}