const express = require('express');
const controller = require('../controller/userController.js');
const userRoutes = express.Router();

userRoutes.get('/', controller.index);
// show route for development purposes only
userRoutes.get('/:id', controller.show);
userRoutes.post('/', controller.create);

module.exports = userRoutes;
