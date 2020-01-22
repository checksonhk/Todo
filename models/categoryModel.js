const db = require('../db/config');

const Category = {};

Category.findById = id => {
  return db.oneOrNone('SELECT * FROM categories WHERE id = $1', [id]);
};

Category.findByName = name => {
  return db.oneOrNone('SELECT * FROM categories WHERE name = $1', [session]);
};

Category.create = name => {
  return db.one('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);
};

// Category.destroy = id => {
//   return db.none(`UPDATE Categorys SET active = false WHERE id = $1`, [id]);
// };

module.exports = Category;
