const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
  id: Number,
  name: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Genre = mongoose.model('Genre', genreSchema);
module.exports = Genre;