const mongoose = require('mongoose');
const itemSchema = require('./item').schema;

const categorySchema = mongoose.Schema({
  name: String,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  avgUseLength: Number,
  setReminder: Boolean,
  reminderLength: Number
});

categorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Category', categorySchema);