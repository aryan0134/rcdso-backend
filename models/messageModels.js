const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const messageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })

messageSchema.statics.messagePost = async function( name, email,phone,time, message){
    //validation

    if( !name || !email || !phone || !time || !message ){
        throw Error('All fields must be filled in')
    }
    if( !validator.isEmail(email)){
        throw Error('This Email is not a valid Email')
    }

    const user = await this.create({ name, email, phone, time, message })

    return user
}

module.exports = mongoose.model('Message', messageSchema)