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

app.engine('hbs', exphbrs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// 瀏覽全部餐廳資料
app.get('/', (req, res) => {
	Restaurant.find()
		.lean()
		.then((restaurants) => res.render('index', { restaurants }))
		.catch((err) => console.log(err));
});

app.get('/restaurants/new', (req, res) => {
	res.render('new');
});

app.post('/restaurants', (req, res) => {
	Restaurant.create(req.body)
		.then(() => res.redirect('/'))
		.catch((err) => console.log(err));
});

// 瀏覽單一餐廳
app.get('/restaurants/:id', (req, res) => {
	const id = req.params.id;
	Restaurant.findById(id)
		.lean()
		.then((restaurant) => res.render('show', { restaurant }))
		.catch((err) => console.log(err));
});
// app.get('/search', (req, res) => {
// 	const keyword = req.query.keyword;
// 	const searchResult = restaurantList.results.filter(
// 		(rest) => rest.name.includes(keyword) || rest.category.includes(keyword)
// 	);
// 	res.render('index', { restaurants: searchResult, keyword: keyword });
// });

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
