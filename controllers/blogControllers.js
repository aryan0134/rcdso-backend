const Blog = require('../models/blogModel')
const mongoose = require('mongoose')


const getBlogs = async (req, res) => {
    const user_id = req.user._id
    const blog = await Blog.find({user_id}).sort({createdAt: -1})

    res.status(200).json(blog)
}
// const getBlogsAll = async (req, res) => {
//     const blog = await Blog.find({}.sort({createdAt:-1}))

//     res.status(200).json(blog)
// }

const getBlog = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'Blog not found' })
    }

    const blog = await Blog.findById(id)

    if(!blog){
        return res.status(404).json({ error: 'Blog not found' })
    }

    res.status(200).json(blog)
}

const createBlogs = async (req, res) => {
    const {title,content,postedBy,comments} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!content){
        emptyFields.push('content')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({ error: 'Please fill out all the fields' , emptyFields})
    }

    try{
        const user_id = req.user._id
        const blog = await Blog.create({title,content,postedBy,comments,user_id})
        res.status(200).json(blog)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const deleteBlog = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'Blog not found' })
    }

    const blog = await Blog.findOneAndDelete({_id: id})

    if(!blog){
        return res.status(404).json({ error: 'Blog not found' })
    }

    res.status(200).json(blog)
}

const updateBlog = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'blog not found' })
    }

    const blog = await Blog.findOneAndUpdate({_id: id},{...req.body})

    if(!blog){
        return res.status(404).json({ error: 'blog not found' })
    }

    res.status(200).json(blog)
}


module.exports ={getBlogs,getBlog,createBlogs,updateBlog,deleteBlog}