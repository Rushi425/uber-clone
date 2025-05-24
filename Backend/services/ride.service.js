const rideModel = require('../models/ride.model');
const mapsService = require('../routes/maps.routes')
const crypto = require('crypto')
async function getFare(pickup, destination){
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required to calculate fare');
    }
    
    const distanceTime = await mapsService.getDistanceTime(pickup, destination);

    if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
        throw new Error('Unable to calculate distance and time');
    }
    const distance = distanceTime.distance;
    const duration = distanceTime.duration;

    const baseFare = {
        car: 50,
        moto: 20,
        auto: 30
    }
    const perKmRate = {
        auto :10,
        car: 15,
        moto: 8,
    }
    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5,
    }
    const fare = {
        auto: baseFare.auto + (perKmRate.auto *( distance.value/1000)) + (perMinuteRate.auto * (duration/60)),
        car: baseFare.car + (perKmRate.car * ( distance.value/1000)) + (perMinuteRate.car * (duration/60)),
        motorcycle: baseFare.motorcycle + (perKmRate.motorcycle * ( distance.value/1000)) + (perMinuteRate.motorcycle * (duration/60)),
    };
}

function getOtp(num){
    function generateOtp() {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        return otp;
    }
    return generateOtp(num);
    
}
module.exports.createRide = async ({
    user, pickup, destination, vehicleType, 
})=>{
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('User, pickup, destination, and vehicle type are required to create a ride');
    }

    const fare = await getFare(pickup, destination);
    
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
        otp: getOtp(6),
    })
    return ride;

}



