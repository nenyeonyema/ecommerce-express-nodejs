const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile } = require('../controller/user.auth.controller');
const joiValidator  = require('../middleware/validator.middleware');
const verifyToken = require('../middleware/user.auth');
const { userRegSchema, loginSchema, userUpdateSchema } = require('../joiSchema/user.schema');

router.post('/register', joiValidator(userRegSchema), registerUser);
router.post('/login', joiValidator(loginSchema), loginUser);

router.get('/user', verifyToken, getUserProfile);
router.put('/user/update', verifyToken, joiValidator(userUpdateSchema), updateUserProfile);
router.delete('/user/delete', verifyToken, deleteUserProfile);

module.exports = router;