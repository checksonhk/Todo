// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
// const session = require('express-session');
const cookieSession = require('cookie-session');
const morgan = require('morgan');
const forceSession = require('./lib/utils');

// instantiate express
const app = express();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

app.use(morgan('dev'));

// Register cookie session middleware
app.use(
  cookieSession({
    name: 'session',
    keys: ['somerandomwords'],
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
  }),
);

// app.use(
//   session({
//     secret: 'somerandomwords',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true, maxAge: 365 * 24 * 60 * 60 * 1000 },
//   }),
// );

// request body middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// separated Routes for each Resource
// const usersRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
