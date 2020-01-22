DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TYPE IF EXISTS STATUS;


CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  session VARCHAR(50) UNIQUE 
  -- use sessions to indentify unique visitors 
);

CREATE TYPE STATUS as ENUM('active','pending', 'done');


CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  status STATUS DEFAULT 'active',
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  due_date TIMESTAMP NOT NULL,
  category_id INTEGER
);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255) NOT NULL
)

-- CREATE TABLE IF NOT EXIST sub_tasks (
--   id SERIAL PRIMARY KEY,
--   task_id INTEGER REFERENCES tasks(id) NOT NULL ON DELETE CASCADE,
--   title VARCHAR(255) NOT NULL,
--   active BOOLEAN NOT NULL DEFAULT TRUE,
--   created_at TIMESTAMP NOT NULL DEFAULT NOW()
-- )