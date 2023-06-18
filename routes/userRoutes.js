const express = require('express');

// Controller Functions
const { signupUser,loginUser,updateUser } = require('../controllers/userController')

const router = express.Router();

// Login Route
router.post('/login', loginUser)


// Signup Route
router.post('/signup', signupUser)

// get user
router.patch('/:id', updateUser)  


module.exports = router