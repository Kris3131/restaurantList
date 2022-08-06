const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')

// 新增餐廳資料
router.get('/new', (req, res) => {
	res.render('new')
})

router.post('', (req, res) => {
	Restaurant.create(req.body)
		.then(() => res.redirect('/'))
		.catch((err) => console.log(err))
})

// 瀏覽單一餐廳
router.get('/:id', (req, res) => {
	const id = req.params.id
	Restaurant.findById(id)
		.lean()
		.then((restaurant) => res.render('show', { restaurant }))
		.catch((err) => console.log(err))
})

router.get('/:id/edit', (req, res) => {
	const id = req.params.id
	Restaurant.findById(id)
		.lean()
		.then((restaurant) => res.render('edit', { restaurant }))
		.catch((err) => console.log(err))
})

router.put('/:id', (req, res) => {
	const id = req.params.id
	const restaurantUpdate = req.body
	Restaurant.findByIdAndUpdate(id, restaurantUpdate)
		.then(() => res.redirect('/'))
		.catch((err) => console.log(err))
})

router.delete('/:id', (req, res) => {
	const id = req.params.id
	Restaurant.findByIdAndRemove(id)
		.then(() => res.redirect('/'))
		.catch((err) => console.log(err))
})

module.exports = router
