const db = require('../db/config');

const Task = {};

Task.findAll = () => {
  return db.query('SELECT * FROM ');
};
