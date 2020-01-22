const express = require('express');
// create Controller
const controller = require('../controller/taskController');
const taskRoutes = express.Router();

taskRoutes.get('/', controller.index);
taskRoutes.get('/:id', controller.show);
taskRoutes.post('/', controller.create);
taskRoutes.put('/:id', controller.update);
taskRoutes.delete('/:id', controller.destroy);

module.exports = taskRoutes;
