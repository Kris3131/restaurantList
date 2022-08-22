const express = require('express')
const User = require('../../models/User')
const router = express.Router()

router.get('/login', (req, res) => {
	res.render('login')
})
router.post('/login', (req, res) => {})

router.get('/register', (req, res) => {
	res.render('register')
})

router.post('/register', (req, res) => {
	const { name, email, password, confirmPassword } = req.body
	User.findOne({ email })
		.then((user) => {
			if (user) {
				console.log(`使用者已經註冊過了`)
				res.render('login', { email })
			} else {
				User.create({
					name,
					email,
					password,
				})
					.then(() => res.redirect('/'))
					.catch((err) => console.log(err))
			}
		})
		.catch((err) => console.log(err))
})

module.exports = router
