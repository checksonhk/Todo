const Category = require('../models/CategoryModel');

const controller = {};

controller.index = async (req, res) => {
  try {
    const category = await Category.findByName(req.body.name);
    console.log(category);
    res.json({
      data: { category },
    });
  } catch (err) {
    console.log('ERROR', err);
    res.status(400).json({ message: 'Failed to find category' });
  }
};

controller.create = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body.name);
    res.json({
      data: { newCategory },
    });
  } catch (err) {
    console.log('ERROR', err);
    res.status(400).json({ message: 'Failed to create new category' });
  }
};

module.exports = controller;
