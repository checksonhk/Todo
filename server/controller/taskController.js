const Task = require('../models/taskModel');
const User = require('../models/userModel');

const controller = {};

controller.index = async (req, res) => {
  try {
    // If exisiting user, return task for that user otherwise return all tasks
    const user = await User.findById(req.session.userId);
    if (user) {
      // search query
      if (req.query.query) {
        const tasks = await Task.findByTitle(req.session.userId, req.query.query);
        return res.json({
          data: { tasks },
        });
      }

      // filter query
      if (req.query.filter !== 'all') {
        const tasks = await Task.findAllByStatus(req.session.userId, req.query.filter);
        return res.json({
          data: { tasks },
        });
      }

      // if a order is sepcified return tasks in filtered order, else return task ordered by id
      const tasks = req.query.orderBy
        ? await Task.findAllByUser(req.session.userId, req.query.orderBy)
        : await Task.findAllByUser(req.session.userId);
      return res.json({
        data: { tasks },
      });
    }

    // if user doesn't exist create a user and set session
    const newUser = await User.create();
    req.session.userId = newUser.id;
    const tasks = await Task.findAllByUser(req.session.userId);
    return res.json({
      data: { tasks },
    });

    /* Only allowed to see your own tasks
    const tasks = await Task.findAll();
    res.json({
      data: { tasks },
    });
    */
  } catch (err) {
    console.log('ERROR', err);
    res.status(400).json({ message: 'Failed to find Tasks' });
  }
};

controller.show = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.json({
      data: { task },
    });
  } catch (err) {
    console.log('ERROR', err);
    res.status(400).json({ message: `Failed to find task ${req.params.id}` });
  }
};

// controller.search = async (req, res) => {
//   try {
//     const task = await Task.findByTitle(req.params.id, req.query.query);
//     res.json({
//       data: { task },
//     });
//   } catch (err) {
//     console.log('ERROR', err);
//     res.status(400).json({ message: `Failed to find task contaning ${req.query}` });
//   }
// };

controller.create = async (req, res) => {
  try {
    const newTask = await Task.create({ title: req.body.title, due_date: req.body.due_date }, req.session.userId);
    res.json({
      data: { newTask },
    });
  } catch (err) {
    console.log('ERROR', err);
    res.status(400).json({ message: 'Failed to create new task' });
  }
};

controller.update = async (req, res) => {
  try {
    const updatedTask = await Task.update(
      { title: req.body.title, status: req.body.status, due_date: req.body.due_date, category_id: req.body.category_id },
      req.params.id,
    );
    res.sendStatus(200);
  } catch (err) {
    console.log('ERROR', err);
    res.status(400).json({ message: 'Failed to update task' });
  }
};

controller.delete = async (req, res) => {
  try {
    Task.delete(req.params.id);
    res.json({ message: `Task ${req.params.id} was deleted` });
  } catch (err) {
    console.log('ERROR', err);
    res.status(400).json({ message: 'Failed to delete task' });
  }
};

module.exports = controller;
