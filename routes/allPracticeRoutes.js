const express = require('express')
const Practice = require('../models/practiceModel')


const router = express.Router()


//Get all practices
router.get('/',  async (req, res) => {
    const practice = await Practice.find({}).sort({createdAt: -1})

    res.status(200).json(practice)
})




module.exports = router