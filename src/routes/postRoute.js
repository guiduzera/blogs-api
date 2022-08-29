const express = require('express');
const tokenValidation = require('../middlewares/tokenValidation');
const postControllers = require('../controllers/postControllers');
const verifyBodyMidlleware = require('../middlewares/reqBodyPost');

const postRoute = express.Router();

postRoute.post('/', tokenValidation, verifyBodyMidlleware, postControllers.createNewPost);

postRoute.get('/', tokenValidation, postControllers.findAllInfosPost);

postRoute.get('/:id', tokenValidation, postControllers.findOneInfosPost);

module.exports = postRoute;