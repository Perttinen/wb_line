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

router.delete('/:id', async (req, res) => {
	try {
		console.log(req.params[id])
		const user = await User.findByPk(req.params)
		await user.destroy()
		res.json(user)
	} catch (e) {
		res.status(204).end()
	}
})

module.exports = router
