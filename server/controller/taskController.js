const Task = require('../models/taskModel');

const controller = {};

controller.index = async (req, res) => {
  try {
    console.log(req.query);
    // search query
    if (req.query.query) {
      const task = await Task.findByTitle(req.params.id, req.query.query);
      return res.json({
        data: { task },
      });
    }
    // If exisiting user, return task for that user
    else if (req.session.userId) {
      const tasks = await Task.findAllByUser(req.session.userId);
      return res.json({
        data: { tasks },
      });
    }
    const tasks = await Task.findAll();
    res.json({
      data: { tasks },
    });
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
  console.log(req.body.due_date);
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
      { title: req.body.title, status: req.body.status, due_date: req.body.due_date, category_id: req.body.category },
      req.params.id,
    );
    res.sendStatus(200);
  } catch (err) {
    console.log('ERROR', err);
    res.status(400).json({ message: 'Failed to update task' });
  }
};

controller.destroy = async (req, res) => {
  try {
    Task.destroy(req.params.id);
    res.json({ message: `Task ${req.params.id} was deleted` });
  } catch (err) {
    console.log('ERROR', err);
    res.status(400).json({ message: 'Failed to delete task' });
  }
};

module.exports = controller;
