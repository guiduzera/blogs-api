const express = require('express');
const tokenValidation = require('../middlewares/tokenValidation');
const postControllers = require('../controllers/postControllers');
const verifyBodyMidlleware = require('../middlewares/reqBodyPost');
const updatePostValidate = require('../middlewares/updatePostValidate');

const postRoute = express.Router();

postRoute.post('/', tokenValidation, verifyBodyMidlleware, postControllers.createNewPost);

postRoute.get('/', tokenValidation, postControllers.findAllInfosPost);

postRoute.get('/:id', tokenValidation, postControllers.findOneInfosPost);

postRoute.put('/:id', tokenValidation, updatePostValidate, postControllers.updatePost);

postRoute.delete('/:id', tokenValidation, postControllers.deletePost);

module.exports = postRoute;