const db = require('../db/config');

const Category = {};

Category.findAll = id => {
  return db.query('SELECT * FROM categories');
};

Category.findById = id => {
  return db.oneOrNone('SELECT * FROM categories WHERE id = $1', [id]);
};

Category.findByName = name => {
  return db.oneOrNone('SELECT * FROM categories WHERE name LIKE $1', [name]);
};

Category.create = name => {
  return db.one('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);
};

// Category.delete = id => {
//   return db.none(`UPDATE Categorys SET active = false WHERE id = $1`, [id]);
// };

module.exports = Category;
