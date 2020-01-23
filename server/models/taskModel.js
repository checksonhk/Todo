const db = require('../db/config');

const Task = {};

Task.findAll = () => {
  return db.query('SELECT * FROM tasks ORDER BY due_date');
};

Task.findAllByUser = userId => {
  return db.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY due_date ', [userId]);
};

// use for Search feature, very inefficient, unscalable
Task.findByTitle = (userId, query) => {
  return db.query('SELECT * FROM tasks WHERE user_id = $1 AND title ILIKE $2 OR title ILIKE $3 OR title ILIKE $4 ORDER BY due_date', [
    userId,
    `${query}%`,
    `%${query}`,
    `%${query}%`,
  ]);
};

// use for filtering by status, should create validation for ensuring it only accept 'active', 'pending', 'done'
Task.findAllByStatus = (userId, status) => {
  return db.query('SELECT * FROM tasks WHERE user_id = $1 AND status = $2 ORDER BY due_date ', [userId, status]);
};

Task.findById = id => {
  return db.oneOrNone('SELECT * FROM tasks WHERE id = $1', [id]);
};

Task.create = (task, user_id) => {
  return db.one('INSERT INTO tasks (title, due_date,user_id) VALUES  ($1, $2, $3) RETURNING *', [task.title, task.due_date, user_id]);
};

Task.findLength = task => {
  return db.query('SELECT COUNT(id) FROM tasks');
};

Task.update = (task, id) => {
  return db.none('UPDATE tasks SET title = $1, status = $2, due_date = $3, category_id = $4 WHERE id = $5', [
    task.title,
    task.status,
    task.due_date,
    task.category_id,
    id,
  ]);
};

Task.destroy = id => {
  return db.none(`UPDATE tasks SET active = false WHERE id = $1`, [id]);
};

module.exports = Task;
