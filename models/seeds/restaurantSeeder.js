const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Restaurant = require('../Restaurant');
const restaurantList = require('../../restaurant.json').results;

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', () => console.log('connect error'));
db.once('open', () => {
	console.log('connect success');
	Restaurant.create(restaurantList)
		.then(() => console.log('restaurantSeeder data success'))
		.catch((error) => console.log('error'));
});
