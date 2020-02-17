const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cinemaSchema = new Schema({
  name: String,
  type: String,
  location: { type: { type: String }, coordinates: [Number] }
}, {
  timestamps: true
})

const Cinema = mongoose.model('Cinema', cinemaSchema)

module.exports = Cinema
