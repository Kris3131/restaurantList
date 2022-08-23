const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')

// 新增餐廳資料
router.get('/new', (req, res) => {
	res.render('new')
})

router.post('', (req, res) => {
	const userId = req.user._id
	const {
		name,
		name_en,
		category,
		image,
		location,
		phone,
		google_map,
		rating,
		description,
	} = req.body
	Restaurant.create({
		name,
		name_en,
		category,
		image,
		location,
		phone,
		google_map,
		rating,
		description,
		userId,
	})
		.then(() => res.redirect('/'))
		.catch((err) => console.log(err))
})

// 瀏覽單一餐廳
router.get('/:id', (req, res) => {
	const _id = req.params.id
	const userId = req.user._id
	Restaurant.findOne({ _id, userId })
		.lean()
		.then((restaurant) => res.render('show', { restaurant }))
		.catch((err) => console.log(err))
})

router.get('/:id/edit', (req, res) => {
	const _id = req.params.id
	const userId = req.user._id
	Restaurant.findOne({ _id, userId })
		.lean()
		.then((restaurant) => res.render('edit', { restaurant }))
		.catch((err) => console.log(err))
})

router.put('/:id', (req, res) => {
	const userId = req.user._id
	const _id = req.params.id
	const restaurantUpdate = req.body
	Restaurant.findOneAndUpdate(
		{ $and: [({ _id }, { userId })] },
		restaurantUpdate
	)
		.then(() => res.redirect('/'))
		.catch((err) => console.log(err))
})

router.delete('/:id', (req, res) => {
	const userId = req.user._id
	const _id = req.params.id
	Restaurant.findOneAndRemove({ $and: [{ _id }, { userId }] })
		.then(() => res.redirect('/'))
		.catch((err) => console.log(err))
})

module.exports = router
