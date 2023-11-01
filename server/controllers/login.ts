import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
	res.send('Hello from login!')
	// res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

export default router
