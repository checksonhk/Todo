const db = require('../db/config');

const User = {};

User.findById = id => {
  return db.oneOrNone('SELECT * FROM users WHERE id = $1', [id]);
};

User.findBySession = session => {
  return db.oneOrNone('SELECT * FROM users WHERE session = $1', [session]);
};

User.create = session => {
  return db.one('INSERT INTO users (session) VALUES ($1) RETURNING *', [session]);
};

// User.destroy = id => {
//   return db.none(`UPDATE users SET active = false WHERE id = $1`, [id]);
// };

module.exports = User;
