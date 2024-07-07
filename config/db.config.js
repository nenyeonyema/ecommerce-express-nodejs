const mongoose = require('mongoose');
const configVariables = require('./config');

// This function connect you to your mongodb database
const mongoDBConnection = () => {
    mongoose
    .connect(configVariables.MONGO_URL)
    .then(() => {
        console.log("MONGOD CONNECTED SUCCESSFULLY")
    })
    .catch((err) => {
        console.log(err);
        throw new Error("MONGODB CONNECTION ERROR")
    })
}

module.exports = mongoDBConnection;