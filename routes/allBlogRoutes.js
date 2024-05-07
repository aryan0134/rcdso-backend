const express = require('express')
const Blog = require('../models/blogModel')
// const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

//Require Auth For All Practices
// router.use(requireAuth)


//Get all blog
router.get('/',  async (req, res) => {
    const blog = await Blog.find({}).sort({createdAt: -1})

    res.status(200).json(blog)
})




module.exports = router
