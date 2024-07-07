const express = require('express');
const mongoDBConnection = require('./config/db.config');
const configVariables = require('./config/config');
const routehandler = require('./routes');
const cloudinary = require('cloudinary');
const app = express()

mongoDBConnection();

cloudinary.config({
    cloud_name: configVariables.CLOUD_NAME,
    api_key: configVariables.CLOUDINARY_API_KEY, 
    api_secret: configVariables.CLOUDINARY_API_SECRET
}); 


app.use(express.json());

app.use('/', routehandler);

// This attends to request where the request matches non of the routehandlers
app.use('*', (req, res) => {
    res.json("ROUTE NOT FOUND")
})
module.exports = app