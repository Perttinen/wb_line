const router = require('express').Router()

const { User } = require('../models')

router.get('/', async (req, res) => {
	const users = await User.findAll()
	res.json(users)
})

router.post('/', async (req, res) => {
	try {
		const user = await User.create(req.body)
		res.json(user)
	} catch (e) {
		return res.status(400).json({ e })
	}
})

module.exports = router
