 const express = require('express');
 const router = express.Router();
 const { createInvoice, getAllInvoice, getOneInvoice, updateOneInvoice, deleteOneInvoice } = require('../controller/invoice.controller');
 const invoiceSchema = require('../joiSchema/invoice.schema');
 const joiValidator = require('../middleware/validator.middleware');
 const { idSchema } = require('../joiSchema/update.schema');

 router.post('/create', joiValidator(invoiceSchema), createInvoice);
 router.get('/', getAllInvoice);
 router.get('/getoneinvoice/:id', joiValidator(idSchema, 'params'), getOneInvoice);
 router.put('/updateoneinvoice/:id', joiValidator(idSchema, 'params'), joiValidator(invoiceSchema), updateOneInvoice);
 router.delete('/deleteoneinvoice/:id', joiValidator(idSchema, 'params'), deleteOneInvoice);

 module.exports = router;