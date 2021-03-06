const express = require('express');
const exphbrs = require('express-handlebars');
const restaurantList = require('./restaurant.json');

const app = express();
const port = 3000;

app.engine('handlebars', exphbrs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('index', { restaurants: restaurantList.results });
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
