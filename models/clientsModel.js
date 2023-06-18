const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const clientsSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },
    role: {
        type: String,
        enum: ['client' , 'employee'],
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    postedBy:{
        type: String
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
} , { timestamps: true });

module.exports = mongoose.model('Clients', clientsSchema)