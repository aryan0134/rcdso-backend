const express = require('express')
const {createPractice,getPractice,getPracticeUser,deletePractice,updatePractice} = require('../controllers/practiceControllers')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//Require Auth For All Practices
router.use(requireAuth)

//GET all practices(for users)
router.get('/', getPracticeUser )

//Get all practices
// router.get('/all', getPracticeAll)

//GET single practice
router.get('/:id', getPractice )

//POST a new practice
router.post('/' , createPractice )

//DELETE a practice
router.delete('/:id' , deletePractice )

//UPDATE a practice
router.patch('/:id' , updatePractice )



module.exports = router