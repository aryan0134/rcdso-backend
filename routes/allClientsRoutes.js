const express = require('express')
const Clients = require('../models/clientsModel')


const router = express.Router()


//Get all clients
router.get('/',  async (req, res) => {
    const clients = await Clients.find({}).sort({createdAt: -1})

    res.status(200).json(clients)
})




module.exports = router