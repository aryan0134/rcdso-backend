const express = require('express')
const {getComments,createComments,deleteComment} = require('../controllers/commentControllers')
// const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// //Require Auth For All comments
// router.use(requireAuth)

//GET all comments(for users)
router.get('/:postId', getComments )

//POST a new comment
router.post('/' , createComments )

//DELETE a comment
router.delete('/:id' , deleteComment )



module.exports = router