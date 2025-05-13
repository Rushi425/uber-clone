const axios = require('axios');

module.exports.getAddressCoordinates = async (address) =>{
    const apiKey = process.env.GoogleMapsApiKey;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK'){
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        }
        else {
            throw new Error('Error fetching coordinates');
        }
    }
    catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
}

module.exports.getDistanceTime = async(origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }
    const apiKey = process.env.GoogleMapsApiKey;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No route found between the specified locations');
            }
            // Extracting distance and duration from the response
            const distance = response.data.rows[0].elements[0].distance.text;
            const duration = response.data.rows[0].elements[0].duration.text;
            return {
                distance: distance,
                duration: duration
            };
        }
        else {
            throw new Error('Error fetching distance and time');
        }
    }
    catch (error) {
        console.error('Error fetching distance and time:', error);
        throw error;
    }
}

module.exports.getAutoCompleteSuggestions = async (address) => {
    const apiKey = process.env.GoogleMapsApiKey;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description);
        } else {
            throw new Error('Error fetching address suggestions');
        }
    } catch (error) {
        console.error('Error fetching address suggestions:', error);
        throw error;
    }
}
