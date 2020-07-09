const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  brand: { type: String, required: true },
  startDate: { type: Date, required: true },
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
  setReminder: { type: Boolean, required: true },
  reminderLength: Number
});

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Item', itemSchema);