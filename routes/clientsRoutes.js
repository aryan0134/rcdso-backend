const express = require('express')
const {createClients,getClients,getClientsUser,deleteClients,updateClients} = require('../controllers/clientsControllers')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//Require Auth For All Practices
router.use(requireAuth)

//GET all Clients(for users)
router.get('/', getClientsUser )

//Get all Clients
// router.get('/all', getClientsAll)

//GET single Clients
router.get('/:id', getClients )

//POST a new Clients
router.post('/' , createClients )

//DELETE a Clients
router.delete('/:id' , deleteClients )

//UPDATE a Clients
router.patch('/:id' , updateClients )



module.exports = router