const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

} , { timestamps: true });

// Static Signup Method
userSchema.statics.signup = async function(firstName, lastName, profilePic, email, password){

    // Validation
    if(!firstName || !lastName || !email || !password){
        throw Error('All fields must be filled in')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({email})

    if(exists){
        throw Error('Email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password , salt)

    const user = await this.create({firstName, lastName, profilePic, email, password: hash})

    return user
}

// Static Login method
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All fields must be filled in')
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user
}

userSchema.statics.update = async function(req,firstName, lastName, profilePic, email, password){

    const {id} = req.params

    if(!firstName || !lastName || !email || !password){
        throw Error('All fields must be filled in')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'user not found' })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password , salt)
    
    const body = {firstName,lastName,email,profilePic,password:hash}

    const user = await this.findOneAndUpdate({_id: id},{...body},{new:true})

    return user
}

module.exports = mongoose.model('User', userSchema)

