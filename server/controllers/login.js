const router = require('express').Router()

const { User } = require('../models')

router.get('/', async (req, res) => {
	res.json({ message: 'Hello from login!' })
})

module.exports = router
