const { request } = require('express')
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')

router.get('/', (req, res) => {
	const sortOption = req.query.sort
	if (!sortOption) {
		Restaurant.find()
			.lean()
			.then((restaurants) => res.render('index', { restaurants }))
			.catch((err) => console.log(err))
		return
	}
	if (sortOption === 'asc') {
		Restaurant.find()
			.lean()
			.sort({ name_en: 'asc' })
			.then((restaurants) => res.render('index', { restaurants }))
			.catch((err) => console.log(err))
		return
	} else if (sortOption === 'desc') {
		Restaurant.find()
			.lean()
			.sort({ name_en: 'desc' })
			.then((restaurants) => res.render('index', { restaurants }))
			.catch((err) => console.log(err))
		return
	} else if (sortOption === 'category') {
		Restaurant.find()
			.lean()
			.sort({ category: 'asc' })
			.then((restaurants) => res.render('index', { restaurants }))
			.catch((err) => console.log(err))
		return
	} else {
		Restaurant.find()
			.lean()
			.sort({ location: 'asc' })
			.then((restaurants) => res.render('index', { restaurants }))
			.catch((err) => console.log(err))
		return
	}
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
