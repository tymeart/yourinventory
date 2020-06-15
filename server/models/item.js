const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  brand: String,
  startDate: Date,
  price: Number
});

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Item', itemSchema);