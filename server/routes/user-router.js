const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')
// const LoginCtrl = require('../controllers/login-ctrl')

const router = express.Router()

// router.post('/user', UserCtrl.createUser)
// router.put('/user/:id', UserCtrl.updateUser)
// router.delete('/user/:id', UserCtrl.deleteUser)
// router.get('/user/:id', UserCtrl.getUserById)
// router.get('/users', UserCtrl.getUsers)
router.post('/', UserCtrl.createUser)
router.put('/:id', UserCtrl.updateUser)
router.delete('/:id', UserCtrl.deleteUser)
router.get('/users', UserCtrl.getUsers)
router.get('/:id', UserCtrl.getUserById)
// router.post('/login', LoginCtrl.login)

module.exports = router
