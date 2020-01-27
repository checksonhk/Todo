const express = require('express');
const controller = require('../controller/taskController');
const taskRoutes = express.Router();

taskRoutes.get('/:id', controller.show);
taskRoutes.get('/', controller.index);
taskRoutes.post('/', controller.create);
taskRoutes.put('/:id', controller.update);
taskRoutes.delete('/:id', controller.delete);

module.exports = taskRoutes;
