const router = require('express').Router()

router.get('/', async (req, res) => {
	res.json({ message: 'Hello from login!' })
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

module.exports = router
