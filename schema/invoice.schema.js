const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'product is required']
    },
    quantityPurchased: {
        type: Number,
        required: [true, 'quantity purchased is required']
    },
    buyerName: {
        type: String,
        required: [true, "buyer's name required"]
    }
});

const invoicemodel = mongoose.model('invoice', invoiceSchema);

module.exports = invoicemodel;