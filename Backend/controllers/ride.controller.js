const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapservice = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');
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
        const pickupCoordinates = await mapservice.getAddressCoordinates(pickup);
        console.log('Pickup Coordinates:', pickupCoordinates);
        
        const captainsInRadius = await mapservice.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2)
        ride.otp = '';
    
        const rideWithUser = await rideModel.findById(ride._id).populate('user');
        captainsInRadius.map(captain =>{
            sendMessageToSocketId(captain.socketId,{
                    event: 'new-ride',
                    data: rideWithUser
                })

        })
    } catch (error) {
        console.error('Error creating ride:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.getFare = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { pickup, destination } = req.query;
        
        const fare = await rideService.getFare(pickup, destination);
        
        return res.status(200).json({ fare });
    } catch (error) {
        console.error('Error fetching fare:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.confirmRide = async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { rideId } = req.body;
        try {
            const ride = await rideService.confirmRide(rideId, captain = req.captain);

            sendMessageToSocketId(ride.user.socketId, {
                event: 'ride-confirmed',
                data: ride
            });
            return res.status(200).json({ ride });
        }catch (error) {
            console.error('Error confirming ride:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    catch (error) {
        console.error('Error confirming ride:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.startRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { rideId, otp } = req.body;
        const ride = await rideService.startRide(rideId, otp, req.captain);
        if (!ride) {
            return res.status(404).json({ error: 'Ride not found or invalid OTP' });
        }
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });
        return res.status(200).json({ ride });
    }
    catch (error) {
        console.error('Error starting ride:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.endRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { rideId } = req.body;
        const ride = await rideService.endRide({rideId, captain: req.captain});
        
        if (!ride) {
            return res.status(404).json({ error: 'Ride not found' });
        }
        
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });
        return res.status(200).json({ ride });
    }
    catch (error) {
        console.error('Error ending ride:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}