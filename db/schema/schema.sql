DROP TABLE tasks;

CREATE TABLE IF NOT EXIST users (
  id SERIAL PRIMARY KEY,
  acc VARCHAR(20) UNIQUE, -- use sessions to indentify unique visitors 
)


CREATE TABLE IF NOT EXIST tasks (
  id SERIAL PRIMARY KEY,
  -- user_id INTEGER REFERENCES users(id) NOT NULL ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW();
  -- category_id
)

CREATE TABLE IF NOT EXIST categories (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255) NOT NULL,
)

-- CREATE TABLE IF NOT EXIST sub_tasks (
--   id SERIAL PRIMARY KEY,
--   task_id INTEGER REFERENCES tasks(id) NOT NULL ON DELETE CASCADE,
--   title VARCHAR(255) NOT NULL,
--   active BOOLEAN NOT NULL DEFAULT TRUE,
--   created_at TIMESTAMP NOT NULL DEFAULT NOW();
-- )