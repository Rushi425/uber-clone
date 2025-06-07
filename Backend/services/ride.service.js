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
        auto: Math.round(baseFare.auto + (perKmRate.auto *( distance.value/1000)) + (perMinuteRate.auto * (duration/60))),
        car: Math.round(baseFare.car + (perKmRate.car * ( distance.value/1000)) + (perMinuteRate.car * (duration/60))),
        motorcycle: Math.round(baseFare.motorcycle + (perKmRate.motorcycle * ( distance.value/1000)) + (perMinuteRate.motorcycle * (duration/60))),
    };
}
module.exports.getFare = getFare;
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

module.exports.confirmRide = async (rideId, captain) =>{
    if (!rideId) {
        throw new Error('Ride ID is required to confirm a ride');
    }
    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'accepted',
        captain: captain._id,
     })
    const ride = await rideModel.findById({_id: rideId }).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error('Ride not found');
    }

  return ride;

    
}

module.exports.startRide = async (rideId, otp, captain) => {
    if (!rideId || !otp) {
        throw new Error('Ride ID and OTP are required to start a ride');
    }
    
    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');
    
    if (!ride) {
        throw new Error('Invalid ride ID or OTP');
    }
    
    if (ride.status !== 'accepted') {
        throw new Error('Ride is not in accepted status');
    }
    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }
    await rideModel.findOneAndUpdate(
        { _id: rideId },
        {
            status: 'ongoing',
            duration: ride.duration,
            distance: ride.distance,
        }
    );

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    });
    return ride;

}




