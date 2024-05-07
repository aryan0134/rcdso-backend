const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET , { expiresIn: '30d'})
}

// Login User
const loginUser = async (req,res) => {
    const {email,password} = req.body

    try{
        const user = await User.login(email, password)

        // Create a Token
        const token = createToken(user._id)

        res.status(200).json({email ,user, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// Signup User
const signupUser = async (req,res) => {
    const {firstName,lastName,profilePic,email,password} = req.body

    try{
        const user = await User.signup(firstName, lastName, profilePic, email, password)

        // Create a Token
        const token = createToken(user._id)

        res.status(200).json({email , user, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//Update User
const updateUser = async (req, res) => {
    const {firstName,lastName,profilePic,email,password} = req.body

    try{
        const user = await User.update(req,firstName, lastName, profilePic, email, password)

        // Create a Token
        const token = createToken(user._id)

        res.status(200).json({email , user , token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = { signupUser, loginUser ,updateUser}