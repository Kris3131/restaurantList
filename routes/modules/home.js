const { request } = require('express')
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')

router.get('/', (req, res) => {
	const sortList = ['name', '-name', 'category', 'location']
	const sortOption = sortList.includes(req.query.sort) ? req.query.sort : 'name'
	Restaurant.find()
		.lean()
		.sort(sortOption)
		.then((restaurants) => res.render('index', { restaurants }))
		.catch((err) => console.log(err))
})
router.get('/search', (req, res) => {
	const keyword = req.query.keyword
	if (!keyword) {
		res.redirect('/')
	}
	const keywordLowerCase = keyword.trim().toLowerCase()
	Restaurant.find()
		.lean()
		.then((restaurant) => {
			const filterRestaurant = restaurant.filter(
				(item) =>
					item.name.trim().toLowerCase().includes(keywordLowerCase) ||
					item.category.includes(keywordLowerCase)
			)
			res.render('index', { restaurants: filterRestaurant, keyword })
		})
		.catch((err) => console.log(err))
})

module.exports = router
