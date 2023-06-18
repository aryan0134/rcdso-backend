const express = require('express')
const {getBlogs,getBlog,createBlogs,updateBlog,deleteBlog} = require('../controllers/blogControllers')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//Require Auth For All Practices
router.use(requireAuth)

//GET all practices(for users)
router.get('/', getBlogs )

//GET ALL BLOGS
// router.get('/blogsall', getBlogsAll)

//GET single practice
router.get('/:id', getBlog )

//POST a new practice
router.post('/' , createBlogs )

//DELETE a practice
router.delete('/:id' , deleteBlog )

//UPDATE a practice
router.patch('/:id' , updateBlog )



module.exports = router