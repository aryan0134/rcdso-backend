const express = require('express')
const {createComments} = require('../controllers/commentControllers')
//const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// //Require Auth For All comments
// router.use(requireAuth)


//POST a new comment
router.post('/' , createComments )





module.exports = router
