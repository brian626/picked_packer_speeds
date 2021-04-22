const express = require('express')

const AnalyticsCtrl = require('../controllers/analytics-ctrl')

const router = express.Router()

router.get('/', AnalyticsCtrl.getAnalytics)

module.exports = router
