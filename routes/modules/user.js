const express = require('express')
const User = require('../../models/User')
const passport = require('passport')
const router = express.Router()

router.get('/login', (req, res) => {
	res.render('login')
})
router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/user/login',
		failureMessage: true,
	})
)

router.get('/register', (req, res) => {
	res.render('register')
})

router.post('/register', (req, res) => {
	const { name, email, password, confirmPassword } = req.body
	const errorMessages = []
	if (!name || !email || !password || !confirmPassword) {
		errorMessages.push({ message: `所有欄位都是必填` })
	}
	if (password !== confirmPassword) {
		errorMessages.push({ message: `密碼與確認密碼不符` })
	}
	if (errorMessages.length) {
		res.render('register', {
			errorMessages,
			name,
			email,
			password,
		})
	}
	User.findOne({ email })
		.then((user) => {
			if (user) {
				res.render('login', { email })
			} else {
				User.create({
					name,
					email,
					password,
				})
					.then(() => {
						res.redirect('/')
					})
					.catch((err) => console.log(err))
			}
		})
		.catch((err) => console.log(err))
})

router.get('/logout', (req, res) => {
	req.logout()
	req.flash('success_msg', `你已經成功登出`)
	res.redirect('/user/login')
})

module.exports = router
