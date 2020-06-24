const categoriesRouter = require('express').Router();
const Category = require('../models/category');

categoriesRouter.get('/', async (req, res) => {
  const categories = await Category.find({});
  res.json(categories.map(category => category.toJSON()));
});

categoriesRouter.post('/', async (req, res) => {
  const category = new Category({
    name: req.body.name,
    items: [],
    avgUseLength: 0,
    setReminder: req.body.setReminder,
    reminderLength: req.body.reminderLength
  });

  const savedCategory = await category.save();
  res.json(savedCategory.toJSON());
});

categoriesRouter.put('/:id', async (req, res) => {
  await Category.findByIdAndUpdate(
    req.params.id, 
    {
      name: req.body.name,
      setReminder: req.body.setReminder,
      reminderLength: req.body.reminderLength
    },
    { new: true }
  );
});

module.exports = categoriesRouter;
