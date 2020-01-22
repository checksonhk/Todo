const express = require('express');
// create Controller
const controller = require();

const taskRoutes = express.Router();

taskRoutes.get('/');
taskRoutes.get('/:id');
taskRoutes.post('/');
taskRoutes.put('/:id');
taskRoutes.delete('/:id');

module.exports = taskRoutes;
