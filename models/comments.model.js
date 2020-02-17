const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  // authorId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // },
  // movieId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Movie'
  // },
}, {
  timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema)
