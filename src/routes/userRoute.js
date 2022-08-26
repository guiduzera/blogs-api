const express = require('express');
const userControllers = require('../controllers/userControllers');
const userValidate = require('../middlewares/userValidate');

const userRoute = express.Router();

userRoute.post('/', userValidate, userControllers.createUser);

module.exports = userRoute;