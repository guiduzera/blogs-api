const express = require('express');
const userControllers = require('../controllers/userControllers');
const userValidate = require('../middlewares/userValidate');
const tokenValidation = require('../middlewares/tokenValidation');

const userRoute = express.Router();

userRoute.post('/', userValidate, userControllers.createUser);

userRoute.get('/', tokenValidation, userControllers.findAllUsers);

userRoute.get('/:id', tokenValidation, userControllers.findUsersByPk);

userRoute.delete('/me', tokenValidation, userControllers.deleteUser);

module.exports = userRoute;