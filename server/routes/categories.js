const express = require('express');
const controller = require('../controller/categoryController.js');
const categoryRoutes = express.Router();

categoryRoutes.get('/', controller.index);
// show route for development purposes only
categoryRoutes.get('/:id', controller.show);
categoryRoutes.post('/', controller.create);

module.exports = categoryRoutes;
