const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const Restaurant = require('../Restaurant')
const User = require('../User')
const restaurantList = require('./restaurant.json').restaurants
const userList = require('./user.json').users

db.once('open', () => {
	return Promise.all(
		userList.map((user) => {
			const { name, email, password, restaurantIndex } = user
			return User.create({
				name,
				email,
				password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
			}).then((user) => {
				const restaurantSeeder = restaurantIndex.map((index) => {
					const restaurant = restaurantList[index]
					restaurant.userId = user._id
					return restaurant
				})
				return Restaurant.create(restaurantSeeder)
			})
		})
	)
		.then(() => {
			console.log(`User and Restaurant seed data had been created`)
			process.exit()
		})
		.catch((error) => console.log(error))
})
