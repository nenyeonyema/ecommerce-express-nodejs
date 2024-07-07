const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    product: {
        type: Integer,
        required: [true, 'product is required']
    },
    quantityPurchased: {
        type: Integer,
        required: [true, 'quantity purchased is required']
    },
    buyerName: {
        type: String,
        required: [true, "buyer's name required"]
    }
});

const invoicemodel = mongoose.model('invoice', invoiceSchema);

module.exports = invoicemodel;