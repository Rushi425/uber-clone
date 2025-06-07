const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name requires at least 3 characters'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name requires at least 3 characters'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password requires at least 6 characters'],
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color requires at least 3 characters'],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate requires at least 3 characters'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity should be at least 1'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        }
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    }
});

// Generate Auth Token
captainSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Compare Password
captainSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Hash Password
captainSchema.statics.hashPassword = async function (password) {
    return bcrypt.hash(password, 10);
};

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;
