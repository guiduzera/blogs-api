const express = require('express');
const validateLoginMiddleware = require('../middlewares/validateLogin');
const loginControllers = require('../controllers/loginControllers');

const loginRoute = express.Router();

loginRoute.post('/', validateLoginMiddleware, loginControllers.getAllUsers);

module.exports = loginRoute;