const express = require('express');
const exphbrs = require('express-handlebars');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Restaurant = require('./models/Restaurant');

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', () => console.log('connect error'));
db.once('open', () => console.log('connect success'));

app.engine('handlebars', exphbrs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {
	Restaurant.find()
		.lean()
		.then((restaurants) => res.render('index', { restaurants }))
		.catch((err) => console.log(err));
});

app.get('/restaurants/:restaurant_id', (req, res) => {
	const restaurant = restaurantList.results.find(
		(rest) => rest.id.toString() === req.params.restaurant_id
	);
	res.render('show', { restaurant });
});
app.get('/search', (req, res) => {
	const keyword = req.query.keyword;
	const searchResult = restaurantList.results.filter(
		(rest) => rest.name.includes(keyword) || rest.category.includes(keyword)
	);
	res.render('index', { restaurants: searchResult, keyword: keyword });
});

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
