const mongoose = require('mongoose');

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => console.log(err));
}

module.exports = { connectToDb };
