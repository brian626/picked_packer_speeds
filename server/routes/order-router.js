const express = require('express')

const OrderCtrl = require('../controllers/order-ctrl')

const router = express.Router()

router.post('/', OrderCtrl.createOrder)
router.get('/orders', OrderCtrl.getOrders)
router.post('/startpick/:id', OrderCtrl.startPick)
router.post('/stoppick/:id', OrderCtrl.stopPick)
router.post('/startpack/:id', OrderCtrl.startPack)
router.post('/stoppack/:id', OrderCtrl.stopPack)
router.post('/seed', OrderCtrl.seedOrders)

module.exports = router
