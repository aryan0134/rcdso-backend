const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    postedBy: {
      type: String,
      required: true
    },
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment' 
      }],
    user_id: {
        type: String,
        required: true
    }
  });


  module.exports = mongoose.model('Blog', blogSchema)
