const Clients = require('../models/clientsModel')
const mongoose = require('mongoose')

//GET all clients(for particular users)
const getClientsUser = async (req, res) => {
    const user_id = req.user._id
    const clients = await Clients.find({user_id}).sort({createdAt: -1})

    res.status(200).json(clients)
}


//GET a single client
const getClients = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'client not found' })
    }

    const clients = await Clients.findById(id)

    if(!clients){
        return res.status(404).json({ error: 'client not found' })
    }

    res.status(200).json(clients)
}

//POST a new client
 const createClients = async (req, res) => {
    const {firstName,lastName,profilePic,role,dob,postedBy,description} = req.body

    let emptyFields = []

    if(!firstName){
        emptyFields.push('name')
    }
    if(!lastName){
        emptyFields.push('lastName')
    }
    if(!role){
        emptyFields.push('role')
    }
    if(!dob){
        emptyFields.push('dob')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({ error: 'Please fill out all the fields' , emptyFields})
    }

    try{
        const user_id = req.user._id
        const clients = await Clients.create({firstName,lastName,profilePic,role,dob,postedBy,description,user_id})
        res.status(200).json(clients)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//DELETE a client
const deleteClients = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'client not found' })
    }

    const clients = await Clients.findOneAndDelete({_id: id})

    if(!clients){
        return res.status(404).json({ error: 'client not found' })
    }

    res.status(200).json(clients)
}

//UPDATE a Client
const updateClients = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'client not found' })
    }

    const clients = await Clients.findOneAndUpdate({_id: id},{...req.body})

    if(!clients){
        return res.status(404).json({ error: 'client not found' })
    }

    res.status(200).json(clients)
}


module.exports = {createClients,getClients,getClientsUser,deleteClients,updateClients}