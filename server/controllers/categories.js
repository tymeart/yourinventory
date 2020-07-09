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
    avgUseLength: 0
  });

  const savedCategory = await category.save();
  res.json(savedCategory.toJSON());
});

categoriesRouter.put('/:id', async (req, res) => {
  const update = await Category.findByIdAndUpdate(
    req.params.id, 
    { name: req.body.name },
    { new: true } // returns the newly updated document
  );

  res.json(update.toJSON());
});

module.exports = categoriesRouter;
