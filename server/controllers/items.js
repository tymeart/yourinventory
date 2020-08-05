const itemsRouter = require('express').Router();
const Item = require('../models/item');
const Category = require('../models/category');
const { validationRules, validate } = require('../utils/validator');

itemsRouter.get('/', async (req, res) => {
  const items = await Item.find({}).populate('category', { name: 1 });
  res.json(items.map(item => item.toJSON()));
});

itemsRouter.post('/', validationRules(), validate, async (req, res) => {
  // req.body is the inputs passed in axios request
  const category = await Category.findOne({ name: req.body.category });

  const item = new Item({
    brand: req.body.brand,
    category: category._id,
    endDate: req.body.endDate,
    price: req.body.price,
    quantityNumber: req.body.quantityNumber,
    quantityUnit: req.body.quantityUnit,
    reminderLength: req.body.reminderLength,
    setReminder: req.body.reminder,
    startDate: req.body.startDate
  });

  try {
    const savedItem = await item.save();
    category.items = category.items.concat(savedItem._id);
    await category.save();
    res.json(savedItem.toJSON());
  } catch (error) {
    console.log(error)
  }
});

itemsRouter.put('/:id', validationRules(), validate, async (req, res) => {
  const update = await Item.findByIdAndUpdate(
    req.params.id,
    {
      brand: req.body.brand,
      endDate: req.body.endDate,
      price: req.body.price,
      quantityNumber: req.body.quantityNumber,
      quantityUnit: req.body.quantityUnit,
      reminderLength: req.body.reminderLength,
      setReminder: req.body.reminder,
      startDate: req.body.startDate,
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