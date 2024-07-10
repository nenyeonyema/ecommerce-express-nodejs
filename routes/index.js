const express = require('express');
const router = express.Router();
const catRoute = require('./cat');
const productRoute = require('./product');
const invoiceRoute = require('./invoice');
const authRoute = require('./user');

router.use('/category', catRoute );
router.use('/product', productRoute);
router.use('/invoice', invoiceRoute);
router.use('/auth', authRoute);

module.exports = router;