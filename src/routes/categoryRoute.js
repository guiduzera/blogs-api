const express = require('express');
const tokenValidation = require('../middlewares/tokenValidation');
const categoryControllers = require('../controllers/categoryControllers');

const categoryRoute = express.Router();

categoryRoute.post('/', tokenValidation, categoryControllers.createCategories);

categoryRoute.get('/', tokenValidation, categoryControllers.findAllCategories);

module.exports = categoryRoute;