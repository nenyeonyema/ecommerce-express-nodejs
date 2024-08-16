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
app.use(express.urlencoded({ extended: true }));

app.use('/', routehandler);

// Error-handling middleware to catch bad JSON errors
// app.use((err, req, res, next) => {
//     if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//         console.error('Bad JSON: ', err.message);
//         return res.status(400).send({ message: 'Bad JSON' });
//     }
//     next();
// });

// This attends to request where the request matches non of the routehandlers
app.use('*', (req, res) => {
    res.json("ROUTE NOT FOUND")
})
module.exports = app