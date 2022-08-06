const express = require('express')

const home = require('./modules/home')
const restaurant = require('./modules/restaurant')

const router = express.Router()

router.use('/', home)
router.use('/restaurants', restaurant)

module.exports = router
