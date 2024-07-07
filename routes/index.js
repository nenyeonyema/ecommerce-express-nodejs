const express = require('express');
const router = express.Router();
const catRoute = require('./cat');
const productRoute = require('./product');



// the route.use takes three parameters the route parameter, the validation parameter to hit before the main request parane
// function that creates or finds etc according to the request
router.use('/category', catRoute );
router.use('/product', productRoute);

module.exports = router;