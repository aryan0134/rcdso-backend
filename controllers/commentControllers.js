const Comment = require('../models/commentModel')
const mongoose = require('mongoose')
const Blog = require('../models/blogModel')

const getComments = async (req, res) => {
    const postId = req.params.postId;
  
    await Comment.find({ posting: postId })
      .then((comments) => {
        res.json(comments);
      })
      .catch((err) => {
        console.error('Error retrieving comments:', err);
        res.status(500).json({ error: 'An error occurred while retrieving comments' });
      });
}

const createComments = async (req, res) => {
    const { text, author, posting } = req.body;
  
    const newComment = new Comment({
      text,
      author,
      posting
    });
  
    await newComment.save()
    .then((comment) => {
        // Update the blog post with the comment's ID
        Blog.findByIdAndUpdate(
          post,
          { $push: { comments: comment._id } },
          { new: true }
        )
          .then(() => {
            res.json(comment);
          })
          .catch((err) => {
            console.error('Error updating blog post with comment ID:', err);
            res.status(500).json({ error: 'An error occurred while updating the blog post' });
          });
      })
      .catch((err) => {
        console.error('Error saving comment:', err);
        res.status(500).json({ error: 'An error occurred while saving the comment' });
      });
}



const deleteComment = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'comment not found' })
    }

    const comment = await Comment.findOneAndDelete({_id: id})

    if(!comment){
        return res.status(404).json({ error: 'comment not found' })
    }

    res.status(200).json(comment)
}


module.exports ={getComments,createComments,deleteComment}
