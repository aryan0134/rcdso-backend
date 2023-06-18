const Message = require('../models/messageModels')

const messagePost = async (req,res) => {
    const {name, email, phone, time, message} = req.body

    let emptyFields = []

    if(!name){
        emptyFields.push('name')
    }
    if(!email){
        emptyFields.push('email')
    }
    if(!phone){
        emptyFields.push('phone')
    }
    if(!time){
        emptyFields.push('time')
    }
    if(!message){
        emptyFields.push('message')
    }
    // if(emptyFields.length > 0){
    //     res.status(400).json({ emptyFields })
    // }

    try{
        const response = await Message.messagePost(name, email, phone, time, message)

        res.status(200).json(response)
    } catch(error){

        if(emptyFields.length > 0){
            return res.status(400).json({ error: error.message , emptyFields })
        }
    }
}

module.exports = { messagePost }