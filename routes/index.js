const express = require('express')

const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const user = require('./modules/user')

const router = express.Router()

router.use('/', home)
router.use('/user', user)
router.use('/restaurants', restaurant)

module.exports = router
