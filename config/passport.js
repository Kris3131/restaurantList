const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = (app) => {
	// middleware initialize
	app.use(passport.initialize())
	app.use(passport.session())
	// setting LocalStrategy
	passport.use(
		new LocalStrategy(
			{ usernameField: 'email', passReqToCallback: true },
			(req, email, password, done) => {
				User.findOne({ email })
					.then((user) => {
						if (!user)
							done(null, false, {
								message: req.flash('warning_msg', `找不到 Email 用戶資料`),
							})
						bcrypt.compare(password, user.password).then((isMatch) => {
							if (!isMatch)
								done(null, false, {
									message: req.flash('warning_msg', 'Email 或 密碼有誤'),
								})
						})
						return done(null, user)
					})
					.catch((err) => done(err, false))
			}
		)
	)
	// serializeUser deserializeUser
	passport.serializeUser((user, done) => done(null, user.id))
	passport.deserializeUser((id, done) => {
		User.findById(id)
			.lean()
			.then((user) => done(null, user))
			.catch((err) => done(err, null))
	})
}
