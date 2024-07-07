const express = require('express');
const { createCat, findAllCats, findOneCat, updateOneCat, deleteOneCat } = require('../controller/cat.controller');
const validate = require('express-joi-validate');
const { categorySchema } = require('../joiSchema/category.schema');
const joiValidator = require('../middleware/validator.middleware');
const router = express.Router();


// Note always validate your request before hitting the routers.
router.post('/create', joiValidator(categorySchema), createCat);
router.get('/', findAllCats);
router.get('/findonecat/:id', findOneCat);
router.put('/updateOnecat/:id', joiValidator(categorySchema), updateOneCat);
router.delete('/deleteonecat/:id', deleteOneCat);

module.exports = router;