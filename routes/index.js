const express = require('express');
const router = express.Router();
const catRoute = require('./cat');
const productRoute = require('./product');
const invoiceRoute = require('./invoice');
const userRoutes = require('./user');
const adminRoutes = require('./admin');

router.use('/category', catRoute );
router.use('/product', productRoute);
router.use('/invoice', invoiceRoute);

router.use('/auth/user', userRoutes);
router.use('/auth/admin', adminRoutes);

module.exports = router;