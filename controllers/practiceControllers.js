const Practice = require('../models/practiceModel')
const mongoose = require('mongoose')

//GET all practice(for particular users)
const getPracticeUser = async (req, res) => {
    const user_id = req.user._id
    const practice = await Practice.find({user_id}).sort({createdAt: -1})

    res.status(200).json(practice)
}

//Get all practice(all)
// const getPracticeAll = async (req, res) => {
//     const practice = await Practice.find({}).sort({createdAt: -1})

//     res.status(200).json(practice)
// }

//GET a single practice
const getPractice = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'practice not found' })
    }

    const practice = await Practice.findById(id)

    if(!practice){
        return res.status(404).json({ error: 'practice not found' })
    }

    res.status(200).json(practice)
}

//POST a new practice
 const createPractice = async (req, res) => {
    const {name, location, address, email, website, price, production, phoneNo, description} = req.body

    let emptyFields = []

    if(!name){
        emptyFields.push('name')
    }
    if(!location){
        emptyFields.push('location')
    }
    if(!price){
        emptyFields.push('price')
    }
    if(!production){
        emptyFields.push('production')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({ error: 'Please fill out all the fields' , emptyFields})
    }

    try{
        const user_id = req.user._id
        const practice = await Practice.create({name, location, address, email, website, price, production, phoneNo, description, user_id})
        res.status(200).json(practice)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//DELETE a practice
const deletePractice = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'practice not found' })
    }

    const practice = await Practice.findOneAndDelete({_id: id})

    if(!practice){
        return res.status(404).json({ error: 'practice not found' })
    }

    res.status(200).json(practice)
}

//UPDATE a practice
const updatePractice = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'practice not found' })
    }

    const practice = await Practice.findOneAndUpdate({_id: id},{...req.body})

    if(!practice){
        return res.status(404).json({ error: 'practice not found' })
    }

    res.status(200).json(practice)
}


module.exports = {createPractice,getPractice,getPracticeUser,deletePractice,updatePractice}
