const mapsService = require('../services/maps.service');
const { validationResult } = require('express-validator');

// Function to get coordinates from address
module.exports.getCoordinates = async(req, res, next) => {

    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        const coordinates = await mapsService.getAddressCoordinates(address);
        res.status(200).json({ coordinates });
    }
    catch (error) {
        console.error('Error fetching coordinates:', error);
        res.status(500).json({ error: 'Error fetching coordinates' });
    }
}

// Function to get distance and time between two coordinates
module.exports.getDistanceTime = async(req, res, next) => {

    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;
    if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and destination are required' });
    }
    try {
        const distanceTime = await mapsService.getDistanceTime(origin, destination);
        res.status(200).json({ distanceTime });
    }
    catch (error) {
        console.error('Error fetching distance and time:', error);
        res.status(500).json({ error: 'Error fetching distance and time' });
    }
}

// Function to get address suggestions
module.exports.getAutoCompleteSuggestions = async(req, res, next) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        const suggestions = await mapsService.getAutoCompleteSuggestions(address);
        res.status(200).json({ suggestions });
    }
    catch (error) {
        console.error('Error fetching address suggestions:', error);
        res.status(500).json({ error: 'Error fetching address suggestions' });
    }
}