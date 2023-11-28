const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    text: String,
    author: String,
    timestamp: { type: Date, default: Date.now },
    posting: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
  });
  


module.exports = mongoose.model('Comment', commentSchema)
