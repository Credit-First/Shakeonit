const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  from_addr: { type: String, required: true },
  to_addr: { type: String, required: true },
  // token_id: { type: String, required: true },
  content: { type: String, required: true },
  accept_id: { type: String, required: true },
});

const model = mongoose.model('Message', messageSchema);

module.exports = model;
