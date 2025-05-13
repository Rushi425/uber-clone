const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieparser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors());

app.get('/', (req, res) => {
    return res.send("Hello Rushi..");
});

app.use('/users', userRoutes);
app.use('/captain', captainRoutes);
app.use('/maps', mapsRoutes);
module.exports = app;
