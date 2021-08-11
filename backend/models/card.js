const { isURL } = require('validator');
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validator: (v) => isURL(v, { require_protocol: true }),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    refs: 'user',
    required: true,
  },
  likes: {
    type: mongoose.Schema.Types.Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
