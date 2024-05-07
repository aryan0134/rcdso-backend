const mongoose = require('mongoose')


const Schema = mongoose.Schema

const practiceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    website: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    production: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
},{ timestamps: true })

module.exports = mongoose.model( 'Practice', practiceSchema )

