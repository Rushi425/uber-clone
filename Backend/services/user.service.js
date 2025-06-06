const userModel = require('../models/user.model');

module.exports.createUser = async ({ firstname, lastname, email, password }) => {

    if (!firstname || !lastname || !email || !password) {
        throw new Error("All fields are required");
    }
    
    return await userModel.create({
        fullname: { firstname, lastname }, 
        email,
        password
    });
};
