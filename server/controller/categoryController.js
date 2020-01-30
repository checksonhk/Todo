const Category = require('../models/categoryModel');

const controller = {};

controller.index = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json({
      data: { categories },
    });
  } catch (err) {
    console.log('ERROR', err);
    res.status(400).json({ message: 'Failed to find categories' });
  }
};

controller.show = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
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
