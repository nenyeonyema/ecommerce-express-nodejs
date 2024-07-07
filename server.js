const app = require('./app');
const configVariables = require('./config/config');

app.listen(configVariables.PORT, () => {
    console.log("APP Listening on " + configVariables.PORT)
});