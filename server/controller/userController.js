const User = require('../models/userModel');

const controller = {};

controller.index = async (req, res) => {
  try {
    // check if user already exists
    const user = await User.findById(req.session.userId);
    if (user) {
      return res.json({
        data: { user },
      });
    }
    // if user doesn't exist create a user and set session
    // figure why sessionID is undefined, should use sessionID as unique identifier
    const newUser = await User.create();
    req.session.userId = newUser.id;
    res.json({
      data: { newUser },
    });
  } catch (err) {
    console.log('ERROR', err);
    res.status(400).json({ message: 'Failed to find User' });
  }
};

controller.show = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    req.session.userId = user.id;
    res.sendStatus(200);
  } catch (err) {
    console.log('ERROR', err);
    res.status(400).json({ message: `Failed to find task ${req.params.id}` });
  }
};

controller.create = async (req, res) => {
  try {
    const newUser = await User.create(req.sessionID);
    res.json({
      data: { newUser },
    });
  } catch (err) {
    console.log('ERROR', err);
    res.status(400).json({ message: 'Failed to create new User' });
  }
};

module.exports = controller;
