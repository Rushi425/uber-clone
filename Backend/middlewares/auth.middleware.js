const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

//check weather user authenticate or not using middleware 
module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({error: "Access denied"});
    const isBlackListed = await blacklistModel.findOne({token: token});
    if(isBlackListed) return res.status(401).json({error: "Access denied"});
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        return next();
    }catch(e){
        res.status(401).json({error: "Invalid token"});
    }
}

//check weather captain authenticate or not using middleware
module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token) return res.status(401).json({error: "Access denied"});
    const isBlackListed = await blacklistModel.findOne({token: token});
    if(isBlackListed) return res.status(401).json({error: "Access denied"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain; // Corrected assignment
        return next();
    }
    catch(e){
        res.status(401).json({error: "Invalid token"});
    }
};