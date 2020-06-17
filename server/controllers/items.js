const itemsRouter = require('express').Router();
const Item = require('../models/item');
const Category = require('../models/category');

itemsRouter.get('/', async (req, res) => {
  const items = await Item.find({});
  res.json(items.map(item => item.toJSON()));
});

itemsRouter.post('/', async (req, res) => {
  const category = await Category.findOne({ name: req.body.category });

  const item = new Item({
    category: category._id,
    brand: req.body.brand,
    startDate: req.body.startDate,
    price: req.body.price,
    quantityNumber: req.body.quantityNumber,
    quantityUnit: req.body.quantityUnit
  });

  const savedItem = await item.save();
  console.log(category)
  category.items = category.items.concat(savedItem._id);
  await category.save();
  res.json(savedItem.toJSON());
});

// update

// delete

module.exports = itemsRouter;