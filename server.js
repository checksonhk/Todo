const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

// app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const taskRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');

// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/public/index.html");
// });

app.use('/api/task', taskRouter);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
});
