const Restaurant = require('../Restaurant')
const restaurantList = require('../../restaurant.json').results
const User = require('../User')
const userList = require('../../user.json').users
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')

db.once('open', () => {
	Promise.all(
		userList.map((user) => {
			const { name, email, password } = user
			return User.create({
				name,
				email,
				password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
			}).then((user) => {
				if (user.name === 'user1') {
					for (let i = 0; i < 3; i++) {
						restaurantList[i].userId = user._id
					}
				}
				if (user.name === 'user2') {
					for (let i = 3; i < 6; i++) {
						restaurantList[i].userId = user._id
					}
				}
				return Restaurant.create(restaurantList)
					.then(() => console.log(`restaurant data done`))
					.catch((err) => console.log(err))
			})
		})
	)
		.then(() => {
			console.log(`User and Restaurant seed data had been created`)
			process.exit()
		})
		.catch((error) => console.log('error'))
})
