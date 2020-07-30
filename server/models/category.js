const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  avgUseLength: Number,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  name: { type: String, required: true }
});

categorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Category', categorySchema);