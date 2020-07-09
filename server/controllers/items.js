const itemsRouter = require('express').Router();
const Item = require('../models/item');
const Category = require('../models/category');

itemsRouter.get('/', async (req, res) => {
  const items = await Item.find({}).populate('category', { name: 1 });
  res.json(items.map(item => item.toJSON()));
});

itemsRouter.post('/', async (req, res) => {
  // req.body is the inputs passed in axios request
  const category = await Category.findOne({ name: req.body.category });

  const item = new Item({
    category: category._id,
    brand: req.body.brand,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    price: req.body.price,
    quantityNumber: req.body.quantityNumber,
    quantityUnit: req.body.quantityUnit,
    setReminder: req.body.reminder,
    reminderLength: req.body.reminderLength
  });

  const savedItem = await item.save();
  category.items = category.items.concat(savedItem._id);
  await category.save();
  res.json(savedItem.toJSON());
});

itemsRouter.put('/:id', async (req, res) => {
  const update = await Item.findByIdAndUpdate(
    req.params.id,
    {
      brand: req.body.brand,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      price: req.body.price,
      quantityNumber: req.body.quantityNumber,
      quantityUnit: req.body.quantityUnit,
      setReminder: req.body.reminder,
      reminderLength: req.body.reminderLength
    },
    { new: true } // returns the newly updated document
  );

  res.json(update.toJSON());
});

itemsRouter.delete('/:id', async (req, res) => {
  const deletedItem = await Item.findByIdAndRemove(req.params.id);

  res.json(deletedItem.toJSON());
});

module.exports = itemsRouter;