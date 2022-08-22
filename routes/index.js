const express = require('express')

const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const user = require('./modules/user')
const { authenticator } = require('../middleware/auth')

const router = express.Router()

router.use('/user', user)
router.use('/restaurants', authenticator, restaurant)
router.use('/', authenticator, home)

module.exports = router
