const express = require('express');
const  {createProduct, findAllProducts, findOneProduct, updateOneProduct, deleteOneProduct} = require('../controller/product.controller');
const joiValidator  = require('../middleware/validator.middleware');
const productSchema = require('../joiSchema/product.schema');
const idSchema = require('../joiSchema/id.schema');
const router = express.Router();

// joiValidator(productSchema)
router.post('/create', createProduct);
router.get('/getallproducts', findAllProducts);
router.get('/getoneproduct/:id', joiValidator(idSchema, 'params'), findOneProduct);
router.put('/updateoneproduct/:id', joiValidator(productSchema), joiValidator(idSchema, 'params'), updateOneProduct);
router.delete('/deleteoneproduct/:id', joiValidator(idSchema, 'params'), deleteOneProduct);


module.exports = router;