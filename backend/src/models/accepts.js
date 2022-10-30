const mongoose = require('mongoose');

const { Schema } = mongoose;

const acceptSchema = new Schema({
  contract_address: { type: String, required: true },
  from_address: { type: String, required: true },
  accepter: { type: String, required: false },
  // token_id: { type: String, required: true },
  flag: { type: Boolean, required: false },
});

const model = mongoose.model('Accept', acceptSchema);

module.exports = model;
