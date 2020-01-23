const express = require('express');
const controller = require('../controller/taskController');
const taskRoutes = express.Router();

taskRoutes.get('/:id', controller.show);
// should merge routes
taskRoutes.get('/', controller.index);

taskRoutes.post('/', controller.create);
taskRoutes.put('/:id', controller.update);
taskRoutes.delete('/:id', controller.destroy);

module.exports = taskRoutes;
