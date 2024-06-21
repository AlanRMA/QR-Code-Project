const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
  caption: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
