const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', () => console.log('connect error'));
db.once('open', () => console.log('connect success'));

const Schema = mongoose.Schema;
const restaurantSchema = new Schema({
	name: { type: String, required: true },
	name_en: { type: String, required: true },
	category: { type: String, required: true },
	image: { type: String, required: true },
	location: { type: String, required: true },
	phone: { type: String, required: true },
	google_map: { type: String, required: true },
	rating: { type: Number, required: true },
	description: { type: String, required: true },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
