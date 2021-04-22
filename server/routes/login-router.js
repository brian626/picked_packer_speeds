const express = require('express')

const LoginCtrl = require('../controllers/login-ctrl')

const router = express.Router()

router.post('/', LoginCtrl.login)

module.exports = router
