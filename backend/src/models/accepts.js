const mongoose = require('mongoose');

const { Schema } = mongoose;

const acceptSchema = new Schema({
  contract_address: { type: String, required: true },
  token_id: { type: String, required: true },
  flag: { type: Boolean, required: false },
});

const model = mongoose.model('Accept', acceptSchema);

module.exports = model;
