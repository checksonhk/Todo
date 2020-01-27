const db = require('../db/config');

const Task = {};

Task.findAll = () => {
  return db.query('SELECT * FROM tasks ORDER BY due_date');
};

Task.findAllByUser = (userId, orderBy = 'due_date') => {
  const sqlQuery = 'SELECT * FROM tasks WHERE user_id = $1 AND active = TRUE';

  return db.query(orderBy ? sqlQuery + ` ORDER BY ${orderBy}` : sqlQuery, [userId]);
};

// use for Search feature, very inefficient, unscalable
Task.findByTitle = (userId, query, orderBy) => {
  const sqlQuery = 'SELECT * FROM tasks WHERE user_id = $1 AND active = TRUE AND (title ILIKE $2 OR title ILIKE $3 OR title ILIKE $4)';
  return db.query(orderBy ? sqlQuery + ` ORDER BY ${orderBy}` : sqlQuery, [userId, `${query}%`, `%${query}`, `%${query}%`]);
};

// use for filtering by status, should create validation for ensuring it only accept 'active', 'pending', 'done'
Task.findAllByStatus = (userId, status = 'active') => {
  return db.query('SELECT * FROM tasks WHERE user_id = $1 AND active = TRUE AND status = $2 ORDER BY due_date ', [userId, status]);
};

Task.findById = id => {
  return db.oneOrNone('SELECT * FROM tasks WHERE id = $1 AND active = true', [id]);
};

Task.create = (task, user_id) => {
  return db.one('INSERT INTO tasks (title, due_date, user_id) VALUES  ($1, $2, $3) RETURNING *', [task.title, task.due_date, user_id]);
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

Task.delete = id => {
  return db.none(`UPDATE tasks SET active = false WHERE id = $1`, [id]);
};

module.exports = Task;
