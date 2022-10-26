const mongoose = require('mongoose');

const { Schema } = mongoose;

const acceptSchema = new Schema({
  from_addr: { type: String, required: true },
  to_addr: { type: String, required: true },
  collection_id: { type: String, required: true },
  flag: { type: Boolean, required: false },
});

const model = mongoose.model('Accept', acceptSchema);

module.exports = model;
