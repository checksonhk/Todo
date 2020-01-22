const db = require('../db/config');

const Task = {};

Task.findAll = () => {
  return db.query('SELECT * FROM tasks ORDER BY due_date');
};

Task.findById = id => {
  return db.oneOrNone('SELECT * FROM tasks WHERE id = $1', [id]);
};

Task.create = task => {
  return db.one('INSERT INTO tasks (title, due_date) VALUES  ($1, $2) RETURNING *', [task.title, task.dueDate]);
};

Task.findLength = task => {
  return db.query('SELECT COUNT(id) FROM tasks');
};

Task.update = (task, id) => {
  return db.none('UPDATE tasks SET title = $1, status = $2, due_date = $3 WHERE id = $4 RETURNING *', [
    task.title,
    task.status,
    task.due_date,
    id,
  ]);
};

Task.destroy = id => {
  return db.none(`UPDATE task SET active = FALSE WHERE id = $1`, [id]);
};

module.exports = Task;
