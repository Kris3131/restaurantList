const Restaurant = require('../Restaurant')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
	console.log('connect success')
	Restaurant.create(restaurantList)
		.then(() => console.log('restaurantSeeder data success'))
		.catch((error) => console.log('error'))
})
