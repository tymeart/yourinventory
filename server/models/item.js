const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  brand: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  endDate: Date,
  price: { 
    type: Number,
    min: 0,
    max: 1000, 
    required: true 
  },
  quantityNumber: { 
    type: Number, 
    min: 0,
    max: 1000,
    required: true 
  },
  quantityUnit: { type: String, required: true },
  reminderLength: Number,
  setReminder: { type: Boolean, required: true },
  startDate: { type: Date, required: true }
});

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Item', itemSchema);