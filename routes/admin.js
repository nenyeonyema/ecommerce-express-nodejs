const express = require('express');
const { getAllUsers, getOneUser, updateUser, deleteUser } = require('../controller/admin.auth.controller');
const { authenticate, isAdmin } = require('../middleware/user.auth');
const joiValidator  = require('../middleware/validator.middleware');
const { idSchema, userUpdateSchema } = require('../joiSchema/user.schema');
const router = express.Router();


router.param('id', joiValidator(idSchema, 'params'));

router.get('/users', authenticate, isAdmin, getAllUsers);
router.get('/user/:id', authenticate, isAdmin, getOneUser);
router.put('/user/:id', authenticate, isAdmin, joiValidator(userUpdateSchema), updateUser);
router.delete('/user/:id', authenticate, isAdmin, deleteUser);

module.exports = router;
